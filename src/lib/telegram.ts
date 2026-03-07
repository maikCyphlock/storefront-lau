const TELEGRAM_API_URL = "https://api.telegram.org";
const MAX_UPLOAD_SIZE_BYTES = 45 * 1024 * 1024;

type TelegramFileUpload = {
  fileId: string;
  filePath: string;
  url: string;
  mimeType: string;
  kind: "image" | "video";
};

export function getTelegramConfig() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CDN_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error(
      "Faltan TELEGRAM_BOT_TOKEN y/o TELEGRAM_CDN_CHAT_ID para subir media.",
    );
  }

  return { botToken, chatId };
}

async function callTelegram<T>(
  method: string,
  body: FormData | URLSearchParams,
) {
  const { botToken } = getTelegramConfig();
  const response = await fetch(`${TELEGRAM_API_URL}/bot${botToken}/${method}`, {
    method: "POST",
    body,
  });

  const data = (await response.json().catch(() => null)) as
    | { ok: boolean; result?: T; description?: string }
    | null;

  if (!response.ok || !data?.ok || !data.result) {
    throw new Error(data?.description ?? "No se pudo completar la subida a Telegram.");
  }

  return data.result;
}

export async function getTelegramFilePath(fileId: string) {
  const params = new URLSearchParams({ file_id: fileId });
  const result = await callTelegram<{ file_path: string }>("getFile", params);
  return result.file_path;
}

export function getFileUrl(botToken: string, filePath: string) {
  return `${TELEGRAM_API_URL}/file/bot${botToken}/${filePath}`;
}

export async function uploadFileToTelegram(file: File): Promise<TelegramFileUpload> {
  if (!file.size) {
    throw new Error("El archivo esta vacio.");
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    throw new Error("El archivo supera el limite de 45MB permitido para este flujo.");
  }

  const { botToken, chatId } = getTelegramConfig();
  const kind = file.type.startsWith("video/") ? "video" : "image";
  const body = new FormData();
  body.set("chat_id", chatId);
  body.set("caption", `cdn:${Date.now()}`);
  body.set(kind === "video" ? "video" : "photo", file, file.name);

  const result = await callTelegram<{
    photo?: Array<{ file_id: string }>;
    video?: { file_id: string; mime_type?: string };
    document?: { file_id: string; mime_type?: string };
  }>(kind === "video" ? "sendVideo" : "sendPhoto", body);

  const fileId =
    kind === "video"
      ? result.video?.file_id ?? result.document?.file_id
      : result.photo?.at(-1)?.file_id ?? result.document?.file_id;

  if (!fileId) {
    throw new Error("Telegram no devolvio el identificador del archivo.");
  }

  const filePath = await getTelegramFilePath(fileId);

  return {
    fileId,
    filePath,
    url: getFileUrl(botToken, filePath),
    mimeType: file.type,
    kind,
  };
}
