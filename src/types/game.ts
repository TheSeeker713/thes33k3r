/**
 * Cinematic Narrative Engine - Type Definitions
 * FMV-style choose-your-own-adventure data structure
 */

export interface ChoiceCard {
  /** Unique identifier for this choice */
  id: string;
  /** The text displayed on the card */
  label: string;
  /** Flavor text or description shown on hover */
  description: string;
  /** The room ID this card navigates to */
  targetRoomId: string;
  /** Path to the POV transition video (MP4) */
  transitionVideo: string;
}

export interface RoomNode {
  /** Unique identifier for this room */
  id: string;
  /** Path to the static background image */
  staticBackground: string;
  /** Optional path to a subtle looping video instead of static image */
  loopingBackground?: string;
  /** Array of choice cards available in this room */
  cards: ChoiceCard[];
}

export interface WorldConfig {
  rooms: Record<string, RoomNode>;
  initialRoomId: string;
}

/**
 * Sample World Configuration
 * Contains 4 main rooms (Bank, Saloon, Sheriff, Hotel) 
 * with a Bank → Vault sub-room demonstrating nested navigation
 */
export const worldConfig: WorldConfig = {
  initialRoomId: 'bank',
  rooms: {
    bank: {
      id: 'bank',
      staticBackground: '/rooms/bank-lobby.jpg',
      cards: [
        {
          id: 'bank-to-vault',
          label: 'Enter Vault',
          description: 'The heavy steel door stands open. You can see the glint of gold inside.',
          targetRoomId: 'bankVault',
          transitionVideo: '/rooms/bank-to-vault.mp4',
        },
        {
          id: 'bank-to-saloon',
          label: 'Head to Saloon',
          description: 'Time for a drink and some company.',
          targetRoomId: 'saloon',
          transitionVideo: '/rooms/bank-to-saloon.mp4',
        },
        {
          id: 'bank-talk-teller',
          label: 'Talk to Teller',
          description: 'A nervous clerk watches you approach the counter.',
          targetRoomId: 'bank',
          transitionVideo: '/rooms/bank-talk-teller.mp4',
        },
      ],
    },
    bankVault: {
      id: 'bankVault',
      staticBackground: '/rooms/bank-vault-interior.jpg',
      cards: [
        {
          id: 'vault-back-to-lobby',
          label: 'Return to Lobby',
          description: 'Back to the main floor.',
          targetRoomId: 'bank',
          transitionVideo: '/rooms/vault-to-bank.mp4',
        },
        {
          id: 'vault-inspect-safe',
          label: 'Inspect Safe',
          description: 'A large safe dominates the back wall.',
          targetRoomId: 'bankVault',
          transitionVideo: '/rooms/vault-inspect-safe.mp4',
        },
      ],
    },
    saloon: {
      id: 'saloon',
      staticBackground: '/rooms/saloon-main.jpg',
      cards: [
        {
          id: 'saloon-to-bank',
          label: 'Visit Bank',
          description: 'Time to check on your finances.',
          targetRoomId: 'bank',
          transitionVideo: '/rooms/saloon-to-bank.mp4',
        },
        {
          id: 'saloon-to-sheriff',
          label: 'See Sheriff',
          description: 'Head down to the sheriff\'s office.',
          targetRoomId: 'sheriff',
          transitionVideo: '/rooms/saloon-to-sheriff.mp4',
        },
        {
          id: 'saloon-approach-bar',
          label: 'Approach Bar',
          description: 'The bartender nods as you walk up.',
          targetRoomId: 'saloon',
          transitionVideo: '/rooms/saloon-approach-bar.mp4',
        },
      ],
    },
    sheriff: {
      id: 'sheriff',
      staticBackground: '/rooms/sheriff-office.jpg',
      cards: [
        {
          id: 'sheriff-to-saloon',
          label: 'Return to Saloon',
          description: 'Back to the noise and whiskey.',
          targetRoomId: 'saloon',
          transitionVideo: '/rooms/sheriff-to-saloon.mp4',
        },
        {
          id: 'sheriff-to-hotel',
          label: 'Go to Hotel',
          description: 'Maybe it\'s time to rest.',
          targetRoomId: 'hotel',
          transitionVideo: '/rooms/sheriff-to-hotel.mp4',
        },
        {
          id: 'sheriff-check-wanted',
          label: 'Check Wanted Posters',
          description: 'Faces of the damned line the wall.',
          targetRoomId: 'sheriff',
          transitionVideo: '/rooms/sheriff-check-wanted.mp4',
        },
      ],
    },
    hotel: {
      id: 'hotel',
      staticBackground: '/rooms/hotel-lobby.jpg',
      cards: [
        {
          id: 'hotel-to-sheriff',
          label: 'Visit Sheriff',
          description: 'Something feels off. Better check with the law.',
          targetRoomId: 'sheriff',
          transitionVideo: '/rooms/hotel-to-sheriff.mp4',
        },
        {
          id: 'hotel-to-bank',
          label: 'Head to Bank',
          description: 'Business before rest.',
          targetRoomId: 'bank',
          transitionVideo: '/rooms/hotel-to-bank.mp4',
        },
        {
          id: 'hotel-rent-room',
          label: 'Rent a Room',
          description: 'The clerk holds out a brass key.',
          targetRoomId: 'hotel',
          transitionVideo: '/rooms/hotel-rent-room.mp4',
        },
      ],
    },
  },
};
