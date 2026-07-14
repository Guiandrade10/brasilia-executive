import type { Lang } from '../i18n/ui';

export type FAQItem = {
  q: Record<Lang, string>;
  a: Record<Lang, string>;
};

export const faqHome: FAQItem[] = [
  {
    q: {
      pt: 'Vocês atendem no aeroporto de Brasília a qualquer horário?',
      en: 'Do you operate at Brasília airport around the clock?'
    },
    a: {
      pt: 'Sim, 24 horas, incluindo madrugada e fins de semana, com reserva antecipada pelo WhatsApp.',
      en: "Yes. We run 24 hours, including overnight and weekends, with advance booking on WhatsApp."
    }
  },
  {
    q: {
      pt: 'O preço é fechado mesmo com trânsito ou atraso de voo?',
      en: 'Is the price still fixed if traffic is heavy or my flight is late?'
    },
    a: {
      pt: 'Sim. O valor confirmado na reserva é o valor final. Monitoramos o voo e ajustamos a recepção sem custo extra.',
      en: "Yes. The price we confirm at booking is the final one. We track your flight and adjust the pickup at no extra cost."
    }
  },
  {
    q: {
      pt: 'Do you speak English?',
      en: 'Do you speak English?'
    },
    a: {
      pt: 'Yes. Booking, driving and support are available in English.',
      en: 'Yes. Booking, driving and support are available in English.'
    }
  },
  {
    q: {
      pt: 'Como funciona o pagamento?',
      en: 'How does payment work?'
    },
    a: {
      pt: 'Pix, cartão ou faturamento para empresas e embaixadas com agenda recorrente.',
      en: 'Bank transfer (Pix), credit card or monthly invoicing for corporate and embassy accounts.'
    }
  },
  {
    q: {
      pt: 'Vocês emitem recibo ou nota?',
      en: 'Do you issue receipts or invoices?'
    },
    a: {
      pt: 'Sim, emitimos comprovante para reembolso corporativo.',
      en: 'Yes. We issue documented receipts for corporate reimbursement.'
    }
  },
  {
    q: {
      pt: 'A escolta armada é de vocês?',
      en: 'Do you operate the armed escort in-house?'
    },
    a: {
      pt: 'A escolta é executada por empresa de segurança parceira, credenciada pela Polícia Federal. Nós coordenamos a logística em conjunto.',
      en: 'The escort is operated by a partner security firm licensed by the Brazilian Federal Police. We handle the joint logistics.'
    }
  }
];
