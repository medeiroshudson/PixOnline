export interface PixParams {
  nome: string;
  chave: string;
  valor?: string;
  cidade?: string;
  identificacao?: string;
}

export function gerarPayloadPix({
  nome,
  chave,
  valor,
  cidade,
  identificacao,
}: PixParams) {
  // Função para montar campos EMV
  function emv(id: string, value: string) {
    const size = value.length.toString().padStart(2, "0");
    return `${id}${size}${value}`;
  }

  // Payload formatado conforme padrão Pix (simplificado)
  const payloadFormatIndicator = emv("00", "01");
  const merchantAccountInfo = emv(
    "26",
    emv("00", "BR.GOV.BCB.PIX") + emv("01", chave)
  );
  const merchantCategoryCode = emv("52", "0000");
  const transactionCurrency = emv("53", "986");
  const transactionAmount = valor ? emv("54", valor) : "";
  const countryCode = emv("58", "BR");
  const merchantName = emv("59", nome);
  const merchantCity = emv("60", cidade || "BRASIL");
  const txid = emv("05", identificacao || "***");
  const additionalDataField = emv("62", txid);

  let payload =
    payloadFormatIndicator +
    merchantAccountInfo +
    merchantCategoryCode +
    transactionCurrency +
    transactionAmount +
    countryCode +
    merchantName +
    merchantCity +
    additionalDataField;

  // Adiciona CRC16
  payload += "6304";
  payload += crc16(payload).toUpperCase();
  return payload;
}

// Função para calcular CRC16-CCITT (0xFFFF)
function crc16(str: string) {
  let crc = 0xffff;
  for (let c of str) {
    crc ^= c.charCodeAt(0) << 8;
    for (let i = 0; i < 8; i++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
      crc &= 0xffff;
    }
  }
  return crc.toString(16).padStart(4, "0");
}
