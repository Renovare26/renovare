/**
 * Central image paths for the site.
 *
 * IMPORTANT: This is a plain (non-"use client") module so it can be safely imported by
 * BOTH server components and client components. If this object lived in a "use client"
 * file, server components importing it would receive a client-reference stub and every
 * property would read as `undefined`.
 */
export const IMAGES = {
  logo: "https://static.wixstatic.com/media/70f1fc_89c6c8c8f1df4d839d304d81effbdcb5~mv2.png/v1/fill/w_106,h_106,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image0.png",
  heroVideo:
    "https://static.wixstatic.com/media/70f1fc_5121544dae784715901bdfc6a8fd828bf000.jpg/v1/fill/w_1920,h_1080,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/70f1fc_5121544dae784715901bdfc6a8fd828bf000.jpg",
  stephRelaxation:
    "https://static.wixstatic.com/media/d9ed3d_d7c9516db6e841bbbeb74fedb5e88531~mv2.jpg/v1/fill/w_980,h_600,al_c,q_85,enc_avif,quality_auto/d9ed3d_d7c9516db6e841bbbeb74fedb5e88531~mv2.jpg",
  hairshow:
    "https://static.wixstatic.com/media/d9ed3d_3240be45cd8b4994a90ad21284fb1b17~mv2.jpeg/v1/fill/w_600,h_900,al_c,q_85,enc_avif,quality_auto/d9ed3d_3240be45cd8b4994a90ad21284fb1b17~mv2.jpeg",
  aboutDramatic:
    "https://static.wixstatic.com/media/70f1fc_12abf8f06c9c4c69b6d452fee40e8f30~mv2.jpeg/v1/fill/w_800,h_700,al_c,q_80,enc_avif,quality_auto/70f1fc_12abf8f06c9c4c69b6d452fee40e8f30~mv2.jpeg",
  stylistWorking:
    "https://static.wixstatic.com/media/70f1fc_1fed887af8b341448055f20ae92afba4~mv2.jpeg/v1/fill/w_800,h_620,al_c,q_80,enc_avif,quality_auto/70f1fc_1fed887af8b341448055f20ae92afba4~mv2.jpeg",
  salonMirror:
    "https://static.wixstatic.com/media/70f1fc_f336f69f4ac442408192c0d67255f0cb~mv2.jpeg/v1/fill/w_800,h_620,al_c,q_80,enc_avif,quality_auto/70f1fc_f336f69f4ac442408192c0d67255f0cb~mv2.jpeg",
  service1:
    "https://static.wixstatic.com/media/a3c153_608f616240074eec8eb852372ce3f0a6~mv2.jpg/v1/crop/x_739,y_0,w_3995,h_3648/fill/w_600,h_550,al_c,q_80,enc_avif,quality_auto/11062b_fd5c21cdc57f4b19b00f8ec0988396fe_.jpg",
  service2:
    "https://static.wixstatic.com/media/a3c153_ec8e183cfceb4df2a2539411d9839560~mv2.jpg/v1/crop/x_0,y_0,w_3322,h_3031/fill/w_600,h_550,al_c,q_80,enc_avif,quality_auto/noah-boyer-mXz8dKrpO8w-unsplash.jpg",
  service3:
    "https://static.wixstatic.com/media/a3c153_29ef14be24914348a8b5ad2b25f7ce2b~mv2.jpg/v1/crop/x_405,y_0,w_2190,h_2000/fill/w_600,h_550,al_c,q_80,enc_avif,quality_auto/sumner-mahaffey-7Y0NshQLohk-unsplash.jpg",
  service4:
    "https://static.wixstatic.com/media/a3c153_41602b53df014421ab4d75652be69f6e~mv2.jpg/v1/crop/x_386,y_0,w_2155,h_1968/fill/w_600,h_550,al_c,q_80,enc_avif,quality_auto/matt-artz-Fu2v5drnMBA-unsplash%20copy.jpg",
  service5:
    "https://static.wixstatic.com/media/a3c153_e34864e8985040f1ab12c78869871738~mv2.jpg/v1/crop/x_362,y_0,w_1961,h_1791/fill/w_600,h_550,al_c,q_80,enc_avif,quality_auto/hasan-almasi-nKNm_75lH4g-unsplash%20Copy_j.jpg",
  service6:
    "https://static.wixstatic.com/media/a3c153_d4bce0806e2946afbf7c718af7ba2890~mv2.jpg/v1/crop/x_607,y_0,w_3285,h_3000/fill/w_600,h_550,al_c,q_80,enc_avif,quality_auto/olga-o-1nrY9CLAGcI-unsplash.jpg",
  logoWhite:
    "https://static.wixstatic.com/media/70f1fc_d5bc9094bb7945c4ad2103a3d7a86556~mv2.png/v1/fill/w_178,h_178,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/renovare-white2.png",
  // Real salon photos (owner-provided, batch 1)
  founderPortrait: "/images/team/stephanie.jpeg", // Stephanie leaning on the salon chair by the window
  alliePortrait: "/images/team/allie.jpeg", // Allie lounging playfully in the salon chair
  emilyPortrait: "/images/team/emily.jpeg", // Emily in a maroon shirt seated in the salon chair
  annikaPortrait: "/images/team/annika.jpeg", // Annika in a grey top by the salon mirror
  teamGroup: "/images/team/collective-group.jpeg", // the three-person "tiny but mighty" team shot
  workBalayageDetail: "/images/work/balayage-detail.jpeg", // close-up of dimensional balayage
  workBlowoutProfile: "/images/work/blowout-profile.jpeg", // silver-hair blow-dry, profile
  workBrunetteResult: "/images/work/brunette-result.jpeg", // finished brunette waves
  // NOTE: /images/work/stylist-at-work.jpeg was intentionally retired at the owner's request
  // (stylist blow-drying a seated guest while looking away). Do not reintroduce it.
  workCurls: "/images/work/curls.jpeg", // curly/textured styling
  workBlasiaBronde: "/images/work/blasia-bronde.jpg", // Blasia's curly bronde profile
  workBlasiaBlue: "/images/work/blasia-blue.png", // Blasia's curly bronde, blue backdrop

  // Real salon photos (owner-provided, batch 2)
  // Salon / experience
  storyStephRelaxation: "/images/studio/steph-relaxation-table.jpeg", // Steph seated at the relaxation table
  storyColorBar: "/images/studio/color-bar.jpeg", // wide view of the color bar / styling table
  storyRelaxationTable: "/images/studio/relaxation-table.jpeg", // relaxation table with greenery + coloring books
  relaxationTableWide: "/images/salon/relaxation-table-wide.jpeg", // wide view of the relaxation + color table
  relaxationTable: "/images/salon/relaxation-table.jpeg", // relaxation table with greenery
  relaxationTableDetail: "/images/salon/relaxation-table-detail.jpeg", // table detail, books + pencils
  coloringPencils: "/images/salon/coloring-pencils.jpeg", // colored pencils + books detail
  shampooChair: "/images/salon/shampoo-chair.jpeg", // shampoo bowl by the window

  // Aesthetics (independent business operating inside Renovaré)
  radoslavaPortrait: "/images/team/radoslava.png", // Radoslava in her treatment room
  facialTreatment: "/images/facials/facial-treatment.jpeg", // facial in progress

  // Work — color, cut, styling
  workPlatinumContrast: "/images/work/platinum-contrast.jpg", // black + platinum contrast money piece
  workCaramelBalayage: "/images/work/brunette-caramel-balayage.jpg", // caramel balayage on brunette
  workCopperWaves: "/images/work/copper-blonde-waves.jpg", // copper / strawberry blonde waves
  workBrunetteWaves: "/images/work/brunette-waves.jpeg", // deep brunette waves
  workBrunetteWaves2: "/images/work/brunette-waves-2.jpeg", // deep brunette waves, alt
  workBrondeWaves: "/images/work/bronde-blonde-waves.jpeg", // golden bronde lived-in blonde
  workPrecisionCut: "/images/work/precision-cut-layers.jpeg", // long layered precision cut
  workSunkissedBlonde: "/images/work/sunkissed-blonde.jpeg", // sun-kissed beachy blonde
  workSilverBlendBob: "/images/work/silver-blend-bob.jpg", // bob with silver/gray blending
  workGlossyMelt: "/images/work/color-glossy-melt.jpeg", // glossy brunette-to-caramel color melt, back view
}
