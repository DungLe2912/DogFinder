export type THeight = {
  imperial: string;
  metric: string;
};

export type TWeight = {
  imperial: string;
  metric: string;
};

export type TImage = {
  id: string;
  width: number;
  height: number;
  url: string;
};

export type TBreed = {
  id: number;
  name: string;
  temperament: string;
  life_span: string;
  origin?: string;
  bred_for?: string;
  breed_group?: string;
  height: THeight;
  weight: TWeight;
  image?: TImage;
};
