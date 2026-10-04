/* ==========================================================================
   Ilustrações dos presentes (SVG, 120 x 120).
   As cores vêm das classes definidas em css/styles.css (f-*, ln, th, dash).
   ========================================================================== */

(function () {
  "use strict";

  const ICONES = {
    /* ---------------- Cozinha ---------------- */
    panela: `
      <rect class="ln f-argila" x="30" y="50" width="60" height="44" rx="7"/>
      <rect class="ln f-papel" x="26" y="40" width="68" height="12" rx="6"/>
      <circle class="ln f-madeira" cx="60" cy="33" r="6"/>
      <rect class="ln f-papel" x="12" y="62" width="18" height="8" rx="4"/>
      <rect class="ln f-papel" x="90" y="62" width="18" height="8" rx="4"/>`,

    frigideira: `
      <rect class="ln f-madeira" x="72" y="57" width="42" height="11" rx="5.5" transform="rotate(-8 72 62)"/>
      <circle class="ln f-argila" cx="50" cy="64" r="32"/>
      <circle class="ln f-tinta" cx="50" cy="64" r="22"/>
      <path class="f-papel" d="M35 66c-4-10 6-18 16-16 12-4 22 6 14 16-4 8-24 10-30 0z"/>
      <circle class="f-gema" cx="50" cy="62" r="6"/>`,

    facas: `
      <rect class="ln f-argila" x="38" y="38" width="9" height="30" rx="3"/>
      <rect class="ln f-argila" x="55" y="28" width="9" height="40" rx="3"/>
      <rect class="ln f-argila" x="72" y="38" width="9" height="30" rx="3"/>
      <rect class="ln f-papel" x="32" y="64" width="56" height="38" rx="6"/>
      <path class="ln th" d="M40 78h40M40 90h40"/>`,

    pratos: `
      <ellipse class="ln f-papel" cx="60" cy="82" rx="40" ry="12"/>
      <ellipse class="ln f-papel" cx="60" cy="72" rx="40" ry="12"/>
      <ellipse class="ln f-papel" cx="60" cy="62" rx="40" ry="12"/>
      <ellipse class="ln f-salvia" cx="60" cy="62" rx="24" ry="6.5"/>`,

    copos: `
      <path class="f-papel" d="M28 36l6 62h24l6-62z"/>
      <path class="f-salvia" d="M30.2 58l3.8 40h24l3.8-40z"/>
      <path class="ln" d="M28 36l6 62h24l6-62z"/>
      <path class="f-papel" d="M66 50l5 48h22l5-48z"/>
      <path class="f-rosa" d="M67.2 66l3.8 32h22l3.8-32z"/>
      <path class="ln" d="M66 50l5 48h22l5-48z"/>`,

    talheres: `
      <ellipse class="ln f-papel" cx="28" cy="38" rx="9" ry="13"/>
      <path class="ln" d="M28 51v44"/>
      <path class="ln" d="M50 24v18a10 10 0 0 0 20 0V24M60 24v24M60 52v43"/>
      <path class="ln f-papel" d="M82 95V48c0-14 8-22 14-24v71z"/>`,

    pote: `
      <rect class="ln f-papel" x="32" y="46" width="56" height="52" rx="9"/>
      <path class="f-salvia" d="M33.5 72h53v17a8.5 8.5 0 0 1-8.5 8.5H42a8.5 8.5 0 0 1-8.5-8.5z"/>
      <circle class="f-rosa" cx="50" cy="83" r="4"/>
      <circle class="f-rosa" cx="66" cy="89" r="3.5"/>
      <circle class="f-rosa" cx="74" cy="80" r="3"/>
      <rect class="ln f-argila" x="28" y="34" width="64" height="14" rx="5"/>`,

    tabua: `
      <rect class="ln f-madeira" x="14" y="32" width="92" height="60" rx="14"/>
      <circle class="ln f-papel" cx="92" cy="46" r="5"/>
      <circle class="ln f-salvia" cx="34" cy="60" r="11"/>
      <circle class="f-salvia-c" cx="34" cy="60" r="6"/>
      <circle class="ln f-salvia" cx="58" cy="72" r="11"/>
      <circle class="f-salvia-c" cx="58" cy="72" r="6"/>
      <circle class="ln f-salvia" cx="78" cy="58" r="11"/>
      <circle class="f-salvia-c" cx="78" cy="58" r="6"/>`,

    chaleira: `
      <path class="ln" d="M30 54C12 48 12 90 31 84"/>
      <path class="ln f-salvia" d="M84 60l22-20 4 8-22 26z"/>
      <ellipse class="ln f-salvia" cx="58" cy="72" rx="30" ry="28"/>
      <rect class="ln f-papel" x="42" y="38" width="32" height="9" rx="4.5"/>
      <circle class="ln f-argila" cx="58" cy="32" r="5"/>`,

    jarra: `
      <path class="ln" d="M80 46c22 0 22 38 2 38"/>
      <path class="f-papel" d="M36 30h44l4 68H32z"/>
      <path class="f-salvia" d="M34.5 58h47l2 38H33z"/>
      <path class="ln" d="M36 30h44l4 68H32z"/>
      <circle class="ln f-gema" cx="58" cy="76" r="11"/>
      <path class="ln th" d="M58 65v22M47 76h22"/>`,

    /* ---------------- Eletro ---------------- */
    airfryer: `
      <rect class="ln f-argila" x="26" y="24" width="68" height="76" rx="20"/>
      <circle class="ln f-papel" cx="60" cy="54" r="17"/>
      <circle class="f-salvia" cx="60" cy="54" r="9"/>
      <rect class="ln f-papel" x="44" y="80" width="32" height="9" rx="4.5"/>
      <path class="ln th" d="M44 100v6M76 100v6"/>`,

    liquidificador: `
      <path class="ln f-papel" d="M38 20h44l-6 56H44z"/>
      <path class="f-rosa" d="M40.2 44h39.6L76 76H44z"/>
      <rect class="ln f-argila" x="35" y="12" width="50" height="10" rx="4"/>
      <rect class="ln f-argila" x="30" y="76" width="60" height="26" rx="9"/>
      <circle class="ln f-papel" cx="60" cy="89" r="5"/>`,

    batedeira: `
      <rect class="ln f-argila" x="20" y="88" width="68" height="12" rx="6"/>
      <path class="ln f-argila" d="M28 88V48c0-16 14-24 30-24h38v22H68v42z"/>
      <path class="ln f-papel" d="M58 66h44c0 20-10 26-22 26S58 86 58 66z"/>
      <path class="ln" d="M80 46v22"/>
      <ellipse class="ln f-salvia" cx="80" cy="72" rx="6" ry="8"/>`,

    cafeteira: `
      <rect class="ln f-argila" x="28" y="18" width="64" height="20" rx="7"/>
      <rect class="ln f-argila" x="72" y="18" width="20" height="84" rx="7"/>
      <rect class="ln f-argila" x="28" y="92" width="64" height="12" rx="5"/>
      <path class="ln f-papel" d="M38 56h26l-3 36H41z"/>
      <path class="f-cafe" d="M39.6 72h22.8l-1.4 20H41z"/>`,

    sanduicheira: `
      <path class="ln f-argila" d="M16 64V52C16 32 104 32 104 52V64z"/>
      <path class="ln th" d="M34 52h52M40 44h40"/>
      <rect class="ln f-papel" x="16" y="64" width="88" height="22" rx="8"/>
      <rect class="ln f-salvia" x="98" y="62" width="16" height="8" rx="4"/>
      <path class="ln th" d="M30 75h60"/>`,

    ferro: `
      <path class="ln f-salvia" d="M36 56V40C36 22 78 22 78 40V56z"/>
      <path class="ln f-argila" d="M12 94h92c5 0 6-6 3-11L92 62c-4-6-9-10-17-10H30C19 52 15 62 15 72c0 9-1 16-3 22z"/>
      <rect class="ln f-papel" x="12" y="94" width="94" height="9" rx="4.5"/>
      <circle class="ln f-papel" cx="44" cy="72" r="5"/>
      <path class="ln th" d="M62 70h28"/>`,

    aspirador: `
      <path class="hose" d="M70 64c30 0 34-34 12-40"/>
      <rect class="ln f-papel" x="78" y="14" width="26" height="11" rx="5" transform="rotate(-18 91 20)"/>
      <ellipse class="ln f-argila" cx="48" cy="80" rx="32" ry="22"/>
      <circle class="ln f-salvia" cx="50" cy="76" r="8"/>
      <circle class="ln f-papel" cx="28" cy="102" r="9"/>
      <circle class="ln f-papel" cx="68" cy="102" r="9"/>`,

    chaleiraeletrica: `
      <path class="ln" d="M80 52c22 0 22 36 2 36"/>
      <path class="ln" d="M41 50L28 42"/>
      <path class="ln f-rosa" d="M36 98L41 50C42 40 74 40 75 50L82 98z"/>
      <rect class="ln f-papel" x="53" y="58" width="9" height="28" rx="4.5"/>
      <rect class="ln f-argila" x="30" y="98" width="58" height="9" rx="4.5"/>`,

    ventilador: `
      <rect class="ln f-argila" x="56" y="80" width="8" height="18"/>
      <ellipse class="ln f-argila" cx="60" cy="102" rx="24" ry="6"/>
      <circle class="ln f-papel" cx="60" cy="50" r="34"/>
      <g class="ln f-salvia">
        <ellipse cx="60" cy="32" rx="8" ry="16"/>
        <ellipse cx="60" cy="32" rx="8" ry="16" transform="rotate(120 60 50)"/>
        <ellipse cx="60" cy="32" rx="8" ry="16" transform="rotate(240 60 50)"/>
      </g>
      <circle class="ln f-argila" cx="60" cy="50" r="6"/>`,

    microondas: `
      <rect class="ln f-papel" x="12" y="32" width="96" height="62" rx="9"/>
      <rect class="ln f-cafe" x="20" y="40" width="54" height="46" rx="6"/>
      <circle class="ln f-argila" cx="91" cy="50" r="5"/>
      <path class="ln" d="M82 66h18M82 76h18"/>
      <path class="ln th" d="M26 94v7M94 94v7"/>`,

    /* ---------------- Cama, mesa e banho ---------------- */
    toalhas: `
      <rect class="ln f-rosa" x="20" y="72" width="80" height="24" rx="7"/>
      <rect class="ln f-salvia" x="24" y="48" width="72" height="24" rx="7"/>
      <rect class="ln f-papel" x="28" y="24" width="64" height="24" rx="7"/>
      <path class="ln th" d="M80 25v22M86 25v22M84 49v22M90 49v22M88 73v22M94 73v22"/>`,

    cama: `
      <rect class="ln f-madeira" x="18" y="22" width="84" height="40" rx="10"/>
      <rect class="ln f-papel" x="12" y="54" width="96" height="32" rx="9"/>
      <rect class="ln f-rosa" x="22" y="42" width="34" height="18" rx="9"/>
      <rect class="ln f-rosa" x="64" y="42" width="34" height="18" rx="9"/>
      <rect class="ln f-salvia" x="12" y="68" width="96" height="22" rx="9"/>
      <path class="ln" d="M22 90v12M98 90v12"/>`,

    edredom: `
      <rect class="ln f-salvia" x="18" y="38" width="84" height="56" rx="12"/>
      <path class="ln th dash" d="M18 56h84M18 76h84M46 38v56M74 38v56"/>
      <rect class="ln f-papel" x="18" y="30" width="84" height="16" rx="8"/>`,

    travesseiro: `
      <rect class="ln f-rosa" x="48" y="24" width="56" height="42" rx="14" transform="rotate(12 76 45)"/>
      <rect class="ln f-papel" x="14" y="46" width="68" height="46" rx="17"/>
      <path class="ln th" d="M28 69h40"/>`,

    cobertor: `
      <rect class="ln f-rosa" x="22" y="30" width="76" height="60" rx="5"/>
      <path class="ln th" d="M22 50h76M22 70h76M46 30v60M74 30v60"/>
      <path class="ln th" d="M30 90v10M40 90v10M50 90v10M60 90v10M70 90v10M80 90v10M90 90v10"/>`,

    toalhademesa: `
      <path class="ln" d="M32 78v24M88 78v24"/>
      <path class="ln f-rosa" d="M14 50v22c0 8 12 8 18 2 6 8 16 8 28 0 12 8 22 8 28 0 6 6 18 6 18-2V50z"/>
      <ellipse class="ln f-papel" cx="60" cy="50" rx="46" ry="16"/>
      <path class="ln f-salvia-c" d="M54 48l-2-14h16l-2 14z"/>
      <circle class="ln f-argila" cx="60" cy="28" r="6"/>`,

    americano: `
      <rect class="ln f-salvia" x="14" y="30" width="92" height="62" rx="10"/>
      <circle class="ln f-papel" cx="60" cy="61" r="20"/>
      <circle class="ln f-rosa" cx="60" cy="61" r="12"/>
      <path class="ln" d="M28 42v38M92 42v38"/>`,

    tapete: `
      <rect class="ln f-rosa" x="14" y="40" width="92" height="50" rx="25"/>
      <rect class="ln th dash" x="28" y="51" width="64" height="28" rx="14"/>`,

    cortina: `
      <path class="ln" d="M12 20h96"/>
      <rect class="ln f-papel" x="40" y="24" width="40" height="72"/>
      <path class="ln th" d="M60 24v72M40 60h40"/>
      <path class="ln f-salvia" d="M18 22v78c8-4 16 4 24 0V22z"/>
      <path class="ln f-salvia" d="M78 22v78c8-4 16 4 24 0V22z"/>
      <path class="ln th" d="M26 24v70M34 24v68M86 24v68M94 24v70"/>`,

    roupao: `
      <path class="ln f-rosa" d="M42 20l18 22 18-22 24 14-6 68H24L18 34z"/>
      <path class="ln f-papel" d="M42 20l18 44 18-44"/>
      <rect class="ln f-argila" x="20" y="74" width="80" height="9" rx="4.5"/>`,

    /* ---------------- Cozinha e utilidades (novos) ---------------- */
    travessas: `
      <rect class="ln f-rosa" x="30" y="32" width="70" height="36" rx="8" transform="rotate(-8 65 50)"/>
      <rect class="ln f-papel" x="14" y="58" width="92" height="38" rx="9"/>
      <rect class="f-argila" x="24" y="68" width="72" height="16" rx="6"/>`,

    lixeira: `
      <path class="ln f-papel" d="M34 40h52l-5 56a6 6 0 0 1-6 6H45a6 6 0 0 1-6-6z"/>
      <path class="ln th" d="M48 54v36M60 54v36M72 54v36"/>
      <ellipse class="ln f-rosa" cx="60" cy="40" rx="30" ry="8"/>
      <circle class="ln f-argila" cx="60" cy="31" r="5"/>`,

    pizza: `
      <circle class="ln f-rosa" cx="60" cy="62" r="44"/>
      <circle class="ln f-madeira" cx="60" cy="62" r="33"/>
      <circle class="f-gema" cx="60" cy="62" r="26"/>
      <path class="ln th" d="M60 36v52M34 62h52"/>
      <circle class="ln th f-argila" cx="50" cy="52" r="5"/>
      <circle class="ln th f-argila" cx="73" cy="56" r="5"/>
      <circle class="ln th f-argila" cx="58" cy="76" r="5"/>`,

    utensilios: `
      <path class="ln" d="M44 70V36M60 70V26M76 70V38"/>
      <rect class="ln f-rosa" x="30" y="68" width="60" height="34" rx="7"/>
      <path class="ln th" d="M30 80h60"/>
      <circle class="ln f-papel" cx="44" cy="28" r="9"/>
      <ellipse class="ln f-papel" cx="60" cy="16" rx="7" ry="10"/>
      <rect class="ln f-argila" x="68" y="24" width="16" height="15" rx="3"/>`,

    formabolo: `
      <path class="ln f-rosa" d="M30 32v26a34 10 0 0 0 68 0V32z"/>
      <ellipse class="ln f-salvia-c" cx="64" cy="32" rx="34" ry="10"/>
      <path class="ln f-papel" d="M14 62v26a40 12 0 0 0 80 0V62z"/>
      <ellipse class="ln f-salvia" cx="54" cy="62" rx="40" ry="12"/>`,

    pressao: `
      <rect class="ln f-rosa" x="28" y="52" width="64" height="46" rx="8"/>
      <rect class="ln f-papel" x="6" y="66" width="22" height="9" rx="4.5"/>
      <rect class="ln f-papel" x="92" y="66" width="22" height="9" rx="4.5"/>
      <path class="ln f-argila" d="M24 52c0-16 12-22 36-22s36 6 36 22z"/>
      <rect class="ln f-papel" x="53" y="19" width="14" height="11" rx="3"/>
      <rect class="ln f-gema" x="54" y="45" width="12" height="13" rx="3"/>`,

    cuscuzeira: `
      <path class="ln" d="M32 58c-14 0-14 16 0 16M88 58c14 0 14 16 0 16"/>
      <path class="ln f-rosa" d="M30 48h60l-4 50a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6z"/>
      <path class="ln f-argila" d="M28 48c0-14 10-20 32-20s32 6 32 20z"/>
      <circle class="ln f-papel" cx="60" cy="24" r="5"/>
      <path class="ln th" d="M40 70h40M41 84h38"/>
      <path class="ln th" d="M46 18c-4-4 4-6 0-12M74 18c-4-4 4-6 0-12"/>`,

    sobremesa: `
      <ellipse class="ln f-rosa" cx="60" cy="102" rx="22" ry="5"/>
      <circle class="ln f-salvia-c" cx="44" cy="54" r="15"/>
      <circle class="ln f-gema" cx="76" cy="54" r="15"/>
      <circle class="ln f-papel" cx="60" cy="42" r="14"/>
      <path class="ln f-argila" d="M22 62h76c0 22-14 36-38 36S22 84 22 62z"/>
      <circle class="ln f-argila" cx="60" cy="26" r="5"/>`,

    mantimentos: `
      <rect class="ln f-papel" x="16" y="42" width="40" height="58" rx="8"/>
      <path class="f-madeira" d="M17.5 66h37v26a7 7 0 0 1-7 7h-23a7 7 0 0 1-7-7z"/>
      <rect class="ln f-argila" x="14" y="30" width="44" height="14" rx="5"/>
      <rect class="ln f-papel" x="26" y="74" width="20" height="12" rx="3"/>
      <rect class="ln f-papel" x="64" y="58" width="40" height="42" rx="8"/>
      <path class="f-salvia" d="M65.5 78h37v14a7 7 0 0 1-7 7h-23a7 7 0 0 1-7-7z"/>
      <rect class="ln f-argila" x="62" y="48" width="44" height="12" rx="5"/>`,

    boleira: `
      <path class="ln" d="M60 80v18"/>
      <ellipse class="ln f-rosa" cx="60" cy="102" rx="26" ry="6"/>
      <path class="ln f-salvia-c" d="M20 74c0-30 18-46 40-46s40 16 40 46z"/>
      <rect class="ln f-madeira" x="34" y="52" width="52" height="22" rx="5"/>
      <path class="ln th" d="M34 62h52"/>
      <circle class="ln f-argila" cx="60" cy="47" r="4"/>
      <rect class="ln f-rosa" x="12" y="72" width="96" height="10" rx="5"/>
      <circle class="ln f-papel" cx="60" cy="24" r="5"/>`,

    escorredor: `
      <path class="ln" d="M22 52c-14 0-14 14 0 14M98 52c14 0 14 14 0 14"/>
      <path class="ln f-rosa" d="M20 46h80c0 30-16 50-40 50S20 76 20 46z"/>
      <ellipse class="ln f-salvia" cx="60" cy="46" rx="40" ry="8"/>
      <circle class="f-papel" cx="42" cy="62" r="3.5"/>
      <circle class="f-papel" cx="60" cy="68" r="3.5"/>
      <circle class="f-papel" cx="78" cy="62" r="3.5"/>
      <circle class="f-papel" cx="50" cy="80" r="3.5"/>
      <circle class="f-papel" cx="70" cy="80" r="3.5"/>
      <rect class="ln f-argila" x="44" y="94" width="32" height="9" rx="3"/>`,

    mop: `
      <path class="ln" d="M86 12L64 76"/>
      <rect class="ln f-argila" x="70" y="24" width="15" height="22" rx="5" transform="rotate(20 77.5 35)"/>
      <rect class="ln f-papel" x="22" y="94" width="78" height="8" rx="4"/>
      <rect class="ln f-salvia" x="22" y="82" width="78" height="12" rx="6"/>
      <circle class="ln f-papel" cx="64" cy="78" r="6"/>`,

    tempero: `
      <rect class="ln f-papel" x="20" y="44" width="22" height="34" rx="5"/>
      <rect class="ln f-papel" x="49" y="44" width="22" height="34" rx="5"/>
      <rect class="ln f-papel" x="78" y="44" width="22" height="34" rx="5"/>
      <rect class="f-gema" x="21.5" y="62" width="19" height="14" rx="3"/>
      <rect class="f-rosa" x="50.5" y="62" width="19" height="14" rx="3"/>
      <rect class="f-salvia" x="79.5" y="62" width="19" height="14" rx="3"/>
      <rect class="ln f-argila" x="18" y="34" width="26" height="12" rx="4"/>
      <rect class="ln f-salvia" x="47" y="34" width="26" height="12" rx="4"/>
      <rect class="ln f-argila" x="76" y="34" width="26" height="12" rx="4"/>
      <rect class="ln f-madeira" x="12" y="76" width="96" height="12" rx="5"/>
      <path class="ln th" d="M26 88v12M94 88v12"/>`,

    xicaras: `
      <path class="ln" d="M14 62c-12 0-12 16 0 16M104 62c12 0 12 16 0 16"/>
      <ellipse class="ln f-rosa" cx="34" cy="90" rx="26" ry="6"/>
      <ellipse class="ln f-rosa" cx="84" cy="90" rx="26" ry="6"/>
      <path class="ln f-papel" d="M14 54h40v14a20 18 0 0 1-40 0z"/>
      <path class="ln f-papel" d="M64 54h40v14a20 18 0 0 1-40 0z"/>
      <ellipse class="ln f-cafe" cx="34" cy="54" rx="20" ry="4"/>
      <ellipse class="ln f-cafe" cx="84" cy="54" rx="20" ry="4"/>`,

    escorredorpratos: `
      <ellipse class="ln f-papel" cx="22" cy="56" rx="7" ry="27"/>
      <ellipse class="ln f-salvia-c" cx="36" cy="56" rx="7" ry="27"/>
      <ellipse class="ln f-papel" cx="50" cy="56" rx="7" ry="27"/>
      <ellipse class="ln f-salvia-c" cx="64" cy="56" rx="7" ry="27"/>
      <rect class="ln f-rosa" x="10" y="80" width="100" height="14" rx="5"/>
      <path class="ln" d="M90 70V50M97 70V44M104 70V52"/>
      <rect class="ln f-argila" x="82" y="64" width="26" height="22" rx="5"/>
      <path class="ln th" d="M20 94v8M100 94v8"/>`,

    relogio: `
      <circle class="ln f-argila" cx="60" cy="60" r="44"/>
      <circle class="ln f-papel" cx="60" cy="60" r="34"/>
      <path class="ln th" d="M60 31v5M60 84v5M31 60h5M84 60h5"/>
      <path class="ln" d="M60 60V38M60 60l15 9"/>
      <circle class="f-tinta" cx="60" cy="60" r="3.5"/>`,

    /* ---------------- Eletrodomésticos (novos) ---------------- */
    aspiradorvertical: `
      <rect class="ln f-rosa" x="54" y="14" width="12" height="76" rx="5"/>
      <rect class="ln f-argila" x="40" y="38" width="40" height="28" rx="12"/>
      <rect class="ln f-papel" x="46" y="46" width="28" height="12" rx="6"/>
      <rect class="ln f-papel" x="44" y="8" width="32" height="9" rx="4.5"/>
      <path class="ln f-salvia" d="M22 100c0-8 6-12 14-12h36l10 8c4 4 2 10-4 10H30c-6 0-8-3-8-6z"/>`,

    multiprocessador: `
      <rect class="ln f-argila" x="26" y="82" width="68" height="20" rx="8"/>
      <path class="ln f-papel" d="M30 82V44h60v38z"/>
      <path class="f-rosa" d="M31.5 62h57v18h-57z"/>
      <rect class="ln f-argila" x="26" y="36" width="68" height="12" rx="5"/>
      <rect class="ln f-papel" x="70" y="18" width="16" height="20" rx="3"/>
      <rect class="ln f-salvia" x="68" y="10" width="20" height="8" rx="3"/>
      <circle class="ln f-papel" cx="44" cy="92" r="4"/>`,

    mixer: `
      <path class="ln f-papel" d="M24 72h72l-6 32H30z"/>
      <path class="f-rosa" d="M26 82h68l-4 20H30z"/>
      <rect class="ln f-argila" x="48" y="8" width="24" height="54" rx="10"/>
      <circle class="ln f-gema" cx="60" cy="24" r="5"/>
      <rect class="ln f-papel" x="53" y="62" width="14" height="22" rx="3"/>
      <path class="ln f-salvia" d="M44 84h32l-3 14H47z"/>`,

    espremedor: `
      <path class="ln f-salvia" d="M16 60h88c0 26-18 40-44 40S16 86 16 60z"/>
      <ellipse class="ln f-papel" cx="60" cy="60" rx="44" ry="9"/>
      <path class="ln f-papel" d="M44 58c0-24 32-24 32 0z"/>
      <path class="ln th" d="M60 42v16M53 46v12M67 46v12"/>
      <circle class="ln f-gema" cx="96" cy="94" r="12"/>
      <path class="ln th" d="M96 82v24M84 94h24"/>`,

    panelaarroz: `
      <path class="ln f-rosa" d="M20 62h80v28a12 12 0 0 1-12 12H32a12 12 0 0 1-12-12z"/>
      <rect class="ln f-papel" x="6" y="68" width="14" height="9" rx="4.5"/>
      <rect class="ln f-papel" x="100" y="68" width="14" height="9" rx="4.5"/>
      <path class="ln f-argila" d="M24 62c0-26 12-36 36-36s36 10 36 36z"/>
      <rect class="ln f-papel" x="50" y="18" width="20" height="8" rx="4"/>
      <circle class="ln f-papel" cx="60" cy="82" r="9"/>
      <circle class="f-gema" cx="60" cy="82" r="3.5"/>`,

    torradeira: `
      <path class="ln f-madeira" d="M30 54V38a11 11 0 0 1 22 0v16z"/>
      <path class="ln f-madeira" d="M68 54V38a11 11 0 0 1 22 0v16z"/>
      <rect class="ln f-argila" x="16" y="48" width="88" height="48" rx="16"/>
      <path class="ln th" d="M32 55h20M68 55h20"/>
      <rect class="ln f-papel" x="96" y="66" width="12" height="8" rx="4"/>
      <circle class="ln f-papel" cx="36" cy="80" r="6"/>
      <path class="ln th" d="M56 80h32"/>`,

    /* ---------------- Cama, mesa, banho e lavanderia (novos) ---------------- */
    jogobanheiro: `
      <path class="ln" d="M26 52l-2-18M34 52V30M42 52l2-20"/>
      <path class="ln f-papel" d="M18 52h30l-3 34H21z"/>
      <rect class="ln f-salvia" x="60" y="54" width="24" height="32" rx="6"/>
      <rect class="ln f-papel" x="68" y="46" width="8" height="10" rx="2"/>
      <rect class="ln f-papel" x="64" y="38" width="20" height="8" rx="4"/>
      <path class="ln" d="M84 42h8v6"/>
      <rect class="ln f-rosa" x="10" y="84" width="100" height="16" rx="8"/>`,

    panoprato: `
      <path class="ln" d="M52 30c0-16 16-16 16 0"/>
      <rect class="ln f-papel" x="28" y="28" width="64" height="76" rx="5"/>
      <path class="f-rosa" d="M29.5 46h61v10h-61zM29.5 66h61v5h-61z"/>
      <path class="ln th" d="M44 28v76M76 28v76"/>`,

    varal: `
      <path class="ln" d="M22 24V104M98 24V104M22 24h76M22 52h76M22 80h76M12 106h20M88 106h20"/>
      <path class="ln f-argila" d="M34 26l10-6 6 5h8l6-5 10 6-5 12-7-2v24H46V36l-7 2z"/>
      <rect class="ln f-rosa" x="68" y="52" width="22" height="30" rx="3"/>
      <rect class="ln f-salvia-c" x="30" y="80" width="20" height="22" rx="3"/>`,

    tabuapassar: `
      <path class="ln" d="M50 68l-14 38M70 68l14 38M43 92h34"/>
      <path class="ln f-salvia" d="M10 56c0-8 8-14 22-14h62c10 0 16 6 16 12s-6 12-16 12H32C18 66 10 62 10 56z"/>
      <path class="ln f-papel" d="M58 42c0-10 6-18 18-18 8 0 14 8 14 18z"/>
      <path class="ln" d="M68 32c2-6 12-6 14 0"/>`,

    /* ---------------- Reserva ---------------- */
    presente: `
      <rect class="ln f-madeira" x="24" y="52" width="72" height="46" rx="6"/>
      <rect class="ln f-areia" x="20" y="40" width="80" height="16" rx="5"/>
      <path class="ln f-argila" d="M54 40h12v58H54z"/>
      <path class="ln f-argila" d="M60 40c-6-18-26-16-22-6 3 7 14 6 22 6zM60 40c6-18 26-16 22-6-3 7-14 6-22 6z"/>`
  };

  function svg(chave) {
    const corpo = ICONES[chave] || ICONES.presente;
    return '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">' + corpo + "</svg>";
  }

  window.ChaIcones = { svg: svg, chaves: Object.keys(ICONES) };
})();
