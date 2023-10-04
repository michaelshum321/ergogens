/**
 * Using a poorly documented RP2040 ProMicro from AX
 */

module.exports = {
  params: {
    designator: "MCU-AX",
    // orientation: "up",
    side: "F",
    RAW: { type: "net", value: "RAW" },
    RST: { type: "net", value: "RST" },
    VDD: { type: "net", value: "VDD" },
    GND: { type: "net", value: "GND" },
    P0: { type: "net", value: "P0" },
    P1: { type: "net", value: "P1" },
    P2: { type: "net", value: "P2" },
    P3: { type: "net", value: "P3" },
    P4: { type: "net", value: "P4" },
    P5: { type: "net", value: "P5" },
    P6: { type: "net", value: "P6" },
    P7: { type: "net", value: "P7" },
    P8: { type: "net", value: "P8" },
    P9: { type: "net", value: "P9" },
    P10: { type: "net", value: "P10" },
    P11: { type: "net", value: "P11" },
    P12: { type: "net", value: "P12" },
    P13: { type: "net", value: "P13" },
    P14: { type: "net", value: "P14" },
    P15: { type: "net", value: "P15" },
    P16: { type: "net", value: "P16" },
    P20: { type: "net", value: "P20" },
    P21: { type: "net", value: "P21" },
    P22: { type: "net", value: "P22" },
    P23: { type: "net", value: "P23" },
    P26: { type: "net", value: "P26" },
    P27: { type: "net", value: "P27" },
    P28: { type: "net", value: "P28" },
    P29: { type: "net", value: "P29" },
  },
  body: (p) => {
    /**
     * @param {'F'|'S'} side
     * @param {''|'-'} pos y's that should be positive in the front position
     * @param {'-'|''} neg y's that should be negative in the front position
     * @returns
     */
    const fn = (pos, neg) => `
      (module ProMicroAX (layer ${p.side}.Cu) (tedit 651A404A)
      ${p.at /* parametric position */}

      ${"" /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 ${neg}10.16) (layer ${p.side}.SilkS) ${p.ref_hide}
        (effects (font (size 1 1) (thickness 0.15)))
      )

      ${
        "" /* component outline on Silkscreen. note the top of the chip has a thicker line*/
      }
      (fp_line (start -16.5 ${neg}8.89) (end -16.5 ${pos}8.89) (layer ${p.side}.SilkS) (width 0.12))
      (fp_line (start -16.5 ${pos}8.89) (end 16.5 ${pos}8.89) (layer ${p.side}.SilkS) (width 0.04))
      (fp_line (start 16.5 ${neg}8.89) (end 16.5 ${pos}8.89) (layer ${p.side}.SilkS) (width 0.04))
      (fp_line (start -16.5 ${neg}8.89) (end 16.5 ${neg}8.89) (layer ${p.side}.SilkS) (width 0.04))

      ${
        ""
        /* Rough sketch of USB port overhang. It probably does not overhang as much as it does here.
         * Please note, since this is on the Fab layer, it will not actually draw onto the board.
         * It will only be viewable in KiCad.
         */
      }
      (fp_line (start -18 ${neg}4.32) (end -18 ${pos}4.32) (layer ${p.side}.Fab) (width 0.04))
      (fp_line (start -18 ${pos}4.32) (end -13 ${pos}4.32) (layer ${p.side}.Fab) (width 0.04))
      (fp_line (start -13 ${neg}4.32) (end -18 ${neg}4.32) (layer ${p.side}.Fab) (width 0.04))
      (fp_line (start -13 ${neg}4.32) (end -13 ${pos}4.32) (layer ${p.side}.Fab) (width 0.04))

      (pad P10 thru_hole circle (at -15.24 ${pos}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P10.str})
      (pad P0 thru_hole circle (at -12.7 ${pos}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P0.str})
      (pad P1 thru_hole circle (at -10.16 ${pos}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P1.str})
      (pad GND thru_hole circle (at -7.62 ${pos}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.GND.str})
      (pad GND thru_hole circle (at -5.08 ${pos}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.GND.str})
      (pad P2 thru_hole circle (at -2.54 ${pos}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P2.str})
      (pad P3 thru_hole circle (at 0 ${pos}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P3.str})
      (pad P4 thru_hole circle (at 2.54 ${pos}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P4.str})
      (pad P5 thru_hole circle (at 5.08 ${pos}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P5.str})
      (pad P6 thru_hole circle (at 7.62 ${pos}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P6.str})
      (pad P7 thru_hole circle (at 10.16 ${pos}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P7.str})
      (pad P8 thru_hole circle (at 12.7 ${pos}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P8.str})

      (pad P11 thru_hole circle (at -15.24 ${neg}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P11.str})
      (pad RAW thru_hole circle (at -12.7 ${neg}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.RAW.str})
      (pad GND thru_hole circle (at -10.16 ${neg}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.GND.str})
      (pad RST thru_hole circle (at -7.62 ${neg}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.RST.str})
      (pad VDD thru_hole circle (at -5.08 ${neg}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.VDD.str})
      (pad P29 thru_hole circle (at -2.54 ${neg}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P29.str})
      (pad P28 thru_hole circle (at 0 ${neg}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P28.str})
      (pad P27 thru_hole circle (at 2.54 ${neg}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P27.str})
      (pad P26 thru_hole circle (at 5.08 ${neg}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P26.str})
      (pad P22 thru_hole circle (at 7.62 ${neg}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P22.str})
      (pad P20 thru_hole circle (at 10.16 ${neg}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P20.str})
      (pad P23 thru_hole circle (at 12.7 ${neg}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P23.str})

      (pad P9 thru_hole circle (at 15.24 ${pos}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P9.str})
      ${'' /*
      These are removed to make the footprint reversible.
      (pad P12 thru_hole circle (at 15.24 ${pos}5.08 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P12.str})
      (pad P13 thru_hole circle (at 15.24 ${pos}2.54 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P13.str})
      (pad P14 thru_hole circle (at 15.24 0 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P14.str})
      (pad P15 thru_hole circle (at 15.24 ${neg}2.54 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P15.str})
      (pad P16 thru_hole circle (at 15.24 ${neg}5.08 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P16.str})
      */}
      (pad P21 thru_hole circle (at 15.24 ${neg}7.62 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P21.str})
      )
    `;

    if (p.side === 'B') {
      return fn('-', '');
    }
    return fn('', '-');
  },
};
