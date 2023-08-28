
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";

export const googleBigquery = createPiece({
  displayName: "Google-bigquery",
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.7.1',
  logoUrl: "https://cdn.activepieces.com/pieces/google-bigquery.png",
  authors: [],
  actions: [],
  triggers: [],
});
