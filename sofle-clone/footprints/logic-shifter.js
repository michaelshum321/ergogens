// 74AHCT1G125 SOD-23 Shoutout bakingpy from Keeb.io for the help!
// This is a reversible footprint by default!
// The purpose of this component is to shift 3.3V signals to 5V.
// Used to bump RP2040's Signal Voltage for SK6812 Mini-e
module.exports = {
  params: {
    DIN: undefined,
    DOUT: undefined,
    RAW: { type: "net", value: "RAW" },
    GND: { type: "net", value: "GND" },
  },
  body: (p) => {
    const output = `
    (module 74AHCT1G125 (layer F.Cu) (tedit 6529E730)
      ${p.at /* position */}
      (fp_text reference REF** (at 0 2 ${p.rot}) (layer F.SilkS)
        (effects (font (size 1 1) (thickness 0.15)))
      )
      (fp_text value 74AHCT1G125 (at 0 -2 ${p.rot}) (layer F.Fab)
        (effects (font (size 1 1) (thickness 0.15)))
      )
      ${'' /* Front side */}
      ${'' /* Circle above top of chip */}
      (fp_circle (center 0 -1.3) (end 0.4 -1.3) (layer F.SilkS) (width 0.25))
      (pad GND smd rect (at -1.3 -0.95 ${p.rot}) (size 1.1 0.6) (layers F.Cu F.Paste F.Mask) ${p.GND.str})
      (pad DIN smd rect (at -1.3 0 ${p.rot}) (size 1.1 0.6) (layers F.Cu F.Paste F.Mask) ${p.DIN.str})
      (pad GND smd rect (at -1.3 0.95 ${p.rot}) (size 1.1 0.6) (layers F.Cu F.Paste F.Mask) ${p.GND.str})
      (pad VCC smd rect (at 1.3 -0.95 ${p.rot}) (size 1.1 0.6) (layers F.Cu F.Paste F.Mask) ${p.RAW.str})
      (pad DOUT smd rect (at 1.3 0.95 ${p.rot}) (size 1.1 0.6) (layers F.Cu F.Paste F.Mask) ${p.DOUT.str})

      ${'' /* Back side */}
      (fp_circle (center 0 -1.3) (end 0.4 -1.3) (layer B.SilkS) (width 0.25))
      (pad GND smd rect (at -1.3 -0.95 ${p.rot}) (size 1.1 0.6) (layers B.Cu B.Paste B.Mask) ${p.GND.str})
      (pad DIN smd rect (at -1.3 0 ${p.rot}) (size 1.1 0.6) (layers B.Cu B.Paste B.Mask) ${p.DIN.str})
      (pad GND smd rect (at -1.3 0.95 ${p.rot}) (size 1.1 0.6) (layers B.Cu B.Paste B.Mask) ${p.GND.str})
      (pad VCC smd rect (at 1.3 -0.95 ${p.rot}) (size 1.1 0.6) (layers B.Cu B.Paste B.Mask) ${p.VCC.str})
      (pad DOUT smd rect (at 1.3 0.95 ${p.rot}) (size 1.1 0.6) (layers B.Cu B.Paste B.Mask) ${p.DOUT.str})
    )
    `;
    return output;
  },
};
