import { ImageURISource } from "react-native";

type survey = {
  actividad: string;
  campo: string;
  calificacion: string;
  id_empleado: string;
  comentario: string;
  not_user_empleado: string;
};

export type surveyList = survey[];

export type SurveyOpinionType = {
  icon: ImageURISource;
  value: string;
};
