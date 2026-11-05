export type Prediction = { label: string; crop: string; condition: string; confidence: number };
export type PredictionResult = {
  prediction: Prediction;
  top_predictions: Prediction[];
  low_confidence: boolean;
  uncertainty_note: string;
  disclaimer: string;
  model_name: string;
  model_status: string;
  preprocessing: string;
  image_width: number;
  image_height: number;
};
export type Health = { status: string; model_ready: boolean; model_name: string; classes: number; detail: string };
