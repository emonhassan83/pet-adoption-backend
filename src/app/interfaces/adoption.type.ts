import { AnimelSleep } from "@prisma/client";

export type IAdoptionRequest = {
  petId: string;
  petOwnershipExperience: string;
  petsHousehold: string;
  petsNeutered: boolean;
  secureOutdoorArea: boolean;
  animalSleep: AnimelSleep;
  animalAlonePeriodsTime: boolean;
  detailsSupport: string;
};
