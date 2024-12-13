import { NextResponse } from "next/server";

export function successResponse(data: any, init?: ResponseInit) {
  return NextResponse.json(data, { ...init, status: 200 });
}

export function errorResponse(
  message: string = "Une erreur est survenue, veuillez réessayer ultérieurement",
  status: number = 500
) {
  return NextResponse.json({ error: message }, { status });
}

export function unauthorizedResponse(
  message: string = "Votre session a expiré, veuillez vous authentifier"
) {
  return errorResponse(message, 401);
}

export function forbiddenResponse(
  message: string = "Vous n'êtes pas autorisés à effectuer cette action"
) {
  return errorResponse(message, 403);
}

export function notFoundResponse(
  message: string = "Impossible de retrouver la ressource demandée"
) {
  return errorResponse(message, 404);
}
