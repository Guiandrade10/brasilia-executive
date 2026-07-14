import type { Lang } from '../i18n/ui';

export const WHATSAPP_NUMBER = '{{WHATSAPP}}';
export const PHONE_DISPLAY = '{{TELEFONE_DISPLAY}}';
export const EMAIL = '{{EMAIL}}';
export const INSTAGRAM_URL = '{{INSTAGRAM}}';
export const CNPJ = '{{CNPJ}}';

export type WhatsContext = 'global' | 'transfer' | 'daily' | 'wedding' | 'escort';

const messages: Record<WhatsContext, Record<Lang, string>> = {
  global: {
    pt: 'Olá! Gostaria de informações sobre transporte executivo em Brasília.',
    en: "Hello! I'd like information about executive transportation in Brasília."
  },
  transfer: {
    pt: 'Olá! Gostaria de reservar um transfer no Aeroporto de Brasília. Data: ___ Horário: ___ Destino: ___',
    en: "Hello! I'd like to book a Brasília airport transfer. Date: ___ Time: ___ Destination: ___"
  },
  daily: {
    pt: 'Olá! Gostaria de um orçamento de diária com motorista executivo. Data: ___ Roteiro previsto: ___',
    en: "Hello! I'd like a quote for daily chauffeur hire. Date: ___ Planned schedule: ___"
  },
  wedding: {
    pt: 'Olá! Gostaria de um orçamento de transporte para casamento. Data: ___ Local: ___',
    en: "Hello! I'd like a quote for wedding transportation. Date: ___ Venue: ___"
  },
  escort: {
    pt: 'Olá! Gostaria de informações sobre transporte com escolta.',
    en: "Hello! I'd like information about secure transportation with escort."
  }
};

export function whatsappLink(context: WhatsContext, lang: Lang): string {
  const text = encodeURIComponent(messages[context][lang]);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function whatsappMessage(context: WhatsContext, lang: Lang): string {
  return messages[context][lang];
}
