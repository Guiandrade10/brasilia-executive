export const languages = {
  pt: 'PT',
  en: 'EN'
} as const;

export const defaultLang = 'pt';

export type Lang = keyof typeof languages;

export const ui = {
  pt: {
    'nav.services': 'Serviços',
    'nav.transfer': 'Transfer Aeroporto',
    'nav.daily': 'Diárias',
    'nav.wedding': 'Casamentos',
    'nav.escort': 'Escolta',
    'nav.whatsapp': 'WhatsApp',
    'cta.book': 'Reservar pelo WhatsApp',
    'cta.services': 'Ver serviços e valores',
    'cta.final': 'Falar no WhatsApp',
    'footer.brand.tag': 'Grupo Andrade Mesquita',
    'footer.services': 'Serviços',
    'footer.contact': 'Contato',
    'footer.rights': 'Todos os direitos reservados.',
    'footer.email': 'E-mail',
    'footer.phone': 'Telefone',
    'footer.instagram': 'Instagram',
    'lang.switch': 'EN',
    'skip.content': 'Ir para o conteúdo'
  },
  en: {
    'nav.services': 'Services',
    'nav.transfer': 'Airport Transfer',
    'nav.daily': 'Daily Hire',
    'nav.wedding': 'Weddings',
    'nav.escort': 'Escort',
    'nav.whatsapp': 'WhatsApp',
    'cta.book': 'Book on WhatsApp',
    'cta.services': 'See services and rates',
    'cta.final': 'Message on WhatsApp',
    'footer.brand.tag': 'Grupo Andrade Mesquita',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.email': 'Email',
    'footer.phone': 'Phone',
    'footer.instagram': 'Instagram',
    'lang.switch': 'PT',
    'skip.content': 'Skip to content'
  }
} as const;

export function t(lang: Lang, key: keyof typeof ui.pt): string {
  return ui[lang][key];
}

export const routes = {
  pt: {
    home: '/',
    transfer: '/transfer-aeroporto-brasilia',
    daily: '/motorista-executivo-diaria',
    wedding: '/transporte-casamentos',
    escort: '/transporte-com-escolta'
  },
  en: {
    home: '/en/',
    transfer: '/en/brasilia-airport-transfer',
    daily: '/en/executive-chauffeur-daily',
    wedding: '/en/wedding-transportation',
    escort: '/en/secure-transportation'
  }
} as const;
