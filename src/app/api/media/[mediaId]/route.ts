import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { productMedia } from "@/lib/db/schema";
import { getFileUrl, getTelegramConfig, getTelegramFilePath } from "@/lib/telegram";
import { mediaCache } from "@/lib/media-cache";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ mediaId: string }> },
) {
    const { mediaId } = await params;

    if (!mediaId) {
        return new Response("Missing mediaId", { status: 400 });
    }

    try {
        // 1. Resolver mediaId -> telegramFileId desde la DB
        // Esto es persistente y seguro (no expone el file_id)
        const [media] = await db
            .select({ telegramFileId: productMedia.telegramFileId })
            .from(productMedia)
            .where(eq(productMedia.id, mediaId))
            .limit(1);

        if (!media) {
            return new Response("Media not found", { status: 404 });
        }

        const { telegramFileId } = media;

        // 2. Revisar si ya está en caché
        const cachedUrl = mediaCache.get(telegramFileId);
        if (cachedUrl) {
            return NextResponse.redirect(cachedUrl, 302);
        }

        // 3. Si no en caché o expirado, obtener nueva ruta de Telegram
        const filePath = await getTelegramFilePath(telegramFileId);
        const { botToken } = getTelegramConfig();
        const newUrl = getFileUrl(botToken, filePath);

        // 4. Guardar en caché (TTL de 50 minutos)
        mediaCache.set(telegramFileId, newUrl);

        // 5. Redirigir
        return NextResponse.redirect(newUrl, 302);
    } catch (error) {
        console.error(`[media-api] Error processing media ${mediaId}:`, error);
        return new Response("Error processing media", { status: 500 });
    }
}
