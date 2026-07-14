import type { Lang } from '../i18n/ui';
import { routes } from '../i18n/ui';

export type ServiceKey = 'transfer' | 'daily' | 'wedding' | 'escort';

type Service = {
  key: ServiceKey;
  title: Record<Lang, string>;
  card: Record<Lang, string>;
  href: Record<Lang, string>;
};

export const services: Service[] = [
  {
    key: 'transfer',
    title: {
      pt: 'Transfer Aeroporto',
      en: 'Airport Transfer'
    },
    card: {
      pt: 'Recepção no desembarque do Aeroporto de Brasília, com monitoramento do seu voo e placa de identificação. Direto ao hotel, à reunião ou à embaixada.',
      en: 'Meet and greet at Brasília International Airport with flight tracking and a name board. Straight to your hotel, meeting or embassy.'
    },
    href: {
      pt: routes.pt.transfer,
      en: routes.en.transfer
    }
  },
  {
    key: 'daily',
    title: {
      pt: 'Diárias Executivas',
      en: 'Daily Hire'
    },
    card: {
      pt: 'Motorista à disposição por meio período ou dia completo. Agenda cheia em Brasília resolvida com um único carro e um único contato.',
      en: 'A chauffeur at your disposal for a half or full day. A packed Brasília schedule handled with one car and one point of contact.'
    },
    href: {
      pt: routes.pt.daily,
      en: routes.en.daily
    }
  },
  {
    key: 'wedding',
    title: {
      pt: 'Casamentos e Eventos',
      en: 'Weddings and Events'
    },
    card: {
      pt: 'Carro do casal, cortejo de convidados e logística de chegada. Motoristas de terno e coordenação de horários com o cerimonial.',
      en: 'Bridal car, guest transfers and arrival logistics. Suited chauffeurs working in sync with your wedding planner.'
    },
    href: {
      pt: routes.pt.wedding,
      en: routes.en.wedding
    }
  },
  {
    key: 'escort',
    title: {
      pt: 'Transporte com Escolta',
      en: 'Secure Transportation'
    },
    card: {
      pt: 'Para agendas que exigem segurança reforçada. Escolta armada executada por empresa de segurança parceira, credenciada pela Polícia Federal.',
      en: 'For schedules that call for added security. Armed escort provided by a partner security firm licensed by the Brazilian Federal Police.'
    },
    href: {
      pt: routes.pt.escort,
      en: routes.en.escort
    }
  }
];
