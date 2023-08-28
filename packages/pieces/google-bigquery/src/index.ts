
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";

export const bigQueryAuth = PieceAuth.OAuth2({
  authUrl: "https://accounts.google.com/o/oauth2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  required: true,
  scope: [],
})

export const googleBigquery = createPiece({
  displayName: "Google-bigquery",
  auth: bigQueryAuth,
  minimumSupportedRelease: '0.7.1',
  logoUrl: "https://cdn.activepieces.com/pieces/google-bigquery.png",
  authors: [],
  actions: [],
  triggers: [],
});
