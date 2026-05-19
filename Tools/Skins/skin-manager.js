/*
 * Eaglercraft skin manager helper.
 *
 * This does NOT overwrite EaglercraftX compressed profile keys (p/g/s/r).
 * Instead, it stores skin metadata in a dedicated key and returns a payload
 * you can inject into your launch flow.
 */

const SKINS_STORAGE_KEY = "eaglercraftX.injectedSkin";

async function loadSkinsManifest(manifestPath = "./skins.json") {
  const response = await fetch(manifestPath);
  if (!response.ok) {
    throw new Error(`Failed to load skins manifest: ${response.status}`);
  }
  return response.json();
}

function setInjectedSkin(skin) {
  if (!skin || !skin.file) {
    throw new Error("Invalid skin payload");
  }
  localStorage.setItem(SKINS_STORAGE_KEY, JSON.stringify(skin));
}

function getInjectedSkin() {
  const raw = localStorage.getItem(SKINS_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function clearInjectedSkin() {
  localStorage.removeItem(SKINS_STORAGE_KEY);
}

async function buildInjectedSkinPayload(basePath = "./") {
  const skin = getInjectedSkin();
  if (!skin) return null;

  const url = new URL(skin.file, basePath).toString();
  const file = await fetch(url);
  if (!file.ok) {
    throw new Error(`Failed to fetch skin texture: ${file.status}`);
  }

  const blob = await file.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  // Base64 texture payload usable for custom-launcher injection.
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return {
    id: skin.id,
    name: skin.name,
    model: skin.model || "steve",
    mime: blob.type || "image/png",
    textureBase64: btoa(binary)
  };
}

window.eaglerSkinManager = {
  SKINS_STORAGE_KEY,
  loadSkinsManifest,
  setInjectedSkin,
  getInjectedSkin,
  clearInjectedSkin,
  buildInjectedSkinPayload
};
