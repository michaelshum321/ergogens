
/**
 * Based off of
 * https://github.com/keebio/Keebio-Parts.pretty/blob/master/SK6812-MINI-E.kicad_mod
 *
 */
module.exports = {
  params: {
    designator: '',
    VDD: {type: 'net', value: 'VDD'},
    GND: {type: 'net', value: 'GND'},
    DIN: undefined,
    DOUT: undefined
    // DIN: {type: 'net', value: 'DIN'},
    // DOUT: {type: 'net', value: 'DOUT'}
  },
  body: p => {
    const newSegment = (start, end, width, layer, net) => `(segment (start ${getPosition(start[0], start[1])}) (end ${getPosition(end[0], end[1])}) (width ${width}) (layer ${layer}.Cu) (net ${net}))`
    const newVia = (at, size, drill, net) => `(via
      (at ${getPosition(at[0], at[1])} )
      (size ${size})
      (drill ${drill})
      (layers F.Cu B.Cu)
      (net ${net})
    )`;

    const getPosition = (x, y) => {

      // (at 229.8 191.3 0)
      const splitRaw = p.at.split(' ').slice(1,4);
      // we care about 2, 3, 4 (if 4 is there?)
      const [atX, atY, atR] = splitRaw.map(parseFloat);
      if (atX == null || atY == null || atR == null || isNaN(atX) || isNaN(atY) || isNaN(atR)) {
          throw new Error (`Could not get pos for ${p.ref}`);
      }

      const radians = (Math.PI / 180) * atR,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x)) + (sin * (y)) + atX,
      ny = (cos * (y)) - (sin * (x)) + atY;

      const point_str = `${nx.toFixed(2)} ${ny.toFixed(2)}`;
      return point_str;
    }

    // args: { type: 'trace', dx, dy, side}, {type: 'via'}
    function fn(opts, ...args) {
      const { start, net, traceWidth = 0.25} = opts;
      let x = start[0];
      let y = start[1];
      let output = '';

      args.forEach((curr) => {
        if (curr.type === 'trace') {
          output += newSegment([x, y], [x+(curr.dx ?? 0), y+(curr.dy ?? 0)], 0.25, curr.side, net);
          x += curr.dx ?? 0;
          y += curr.dy ?? 0;
        } else if (curr.type === 'via') {
          output += newVia([x, y], 0.8, 0.4, net);
        }
        output += '\n';
      });
      return output;
    }

    let standard = `
      (module sk6812-mini-e (layer F.Cu) (tedit 5DD50113)
        ${p.at /* parametric position */}

        ${'' /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0 2.1) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
        (fp_text value "SK6812-MINI-E" (at 0 -2.54) (layer F.SilkS) hide (effects (font (size 1 1) (thickness 0.15))))

        ${'' /* Silkscreen GND line */}
        (fp_line (start 4 0.4) (end 4 1.1)
          (stroke (width 0.16) (type solid)) (layer "B.SilkS"))
        (fp_line (start 4 -0.4) (end 4 -1.1)
          (stroke (width 0.16) (type solid)) (layer "F.SilkS"))

        ${'' /* User Cmts */}

        (fp_line (start -1.6 -1.4) (end 1.6 -1.4)
          (stroke (width 0.12) (type solid)) (layer "Cmts.User"))
        (fp_line (start -1.6 1.4) (end -1.6 -1.4)
          (stroke (width 0.12) (type solid)) (layer "Cmts.User"))
        (fp_line (start 1.6 -1.4) (end 1.6 1.4)
          (stroke (width 0.12) (type solid)) (layer "Cmts.User"))
        (fp_line (start 1.6 1.4) (end -1.6 1.4)
          (stroke (width 0.12) (type solid)) (layer "Cmts.User"))

        ${'' /* Board Cuts */}

        (fp_line (start -1.7 -1.5) (end 1.7 -1.5)
          (stroke (width 0.12) (type solid)) (layer "Edge.Cuts"))
        (fp_line (start -1.7 1.5) (end -1.7 -1.5)
          (stroke (width 0.12) (type solid)) (layer "Edge.Cuts"))
        (fp_line (start 1.7 -1.5) (end 1.7 1.5)
          (stroke (width 0.12) (type solid)) (layer "Edge.Cuts"))
        (fp_line (start 1.7 1.5) (end -1.7 1.5)
          (stroke (width 0.12) (type solid)) (layer "Edge.Cuts"))

        ${'' /* Solder Pads */}
        (pad "DIN" smd rect (at 2.55 -0.75) (size 1.7 0.82) (layers "B.Cu" "B.Paste" "B.Mask") ${p.DIN.str})
        (pad "DIN" smd rect (at 2.55 0.75) (size 1.7 0.82) (layers "F.Cu" "F.Paste" "F.Mask") ${p.DIN.str})
        (pad "DOUT" smd rect (at -2.55 -0.75) (size 1.7 0.82) (layers "F.Cu" "F.Paste" "F.Mask") ${p.DOUT.str})
        (pad "DOUT" smd rect (at -2.55 0.75) (size 1.7 0.82) (layers "B.Cu" "B.Paste" "B.Mask") ${p.DOUT.str})
        (pad "GND" smd rect (at 2.55 -0.75) (size 1.7 0.82) (layers "F.Cu" "F.Paste" "F.Mask") ${p.GND.str})
        (pad "GND" smd rect (at 2.55 0.75) (size 1.7 0.82) (layers "B.Cu" "B.Paste" "B.Mask") ${p.GND.str})
        (pad "VDD" smd rect (at -2.55 -0.75) (size 1.7 0.82) (layers "B.Cu" "B.Paste" "B.Mask") ${p.VDD.str})
        (pad "VDD" smd rect (at -2.55 0.75) (size 1.7 0.82) (layers "F.Cu" "F.Paste" "F.Mask") ${p.VDD.str})
      )
    `;

    const dout = fn({ start: [-2.55, -0.75], net: p.DOUT.index },
      { type: 'trace', dx: -3.25+2.55, side: 'F' },
      { type: 'trace', dx: -4+3.25, dy: 0 + 0.75, side: 'F'},
      { type: 'via'},
      { type: 'trace', dx: -3.25+4, dy: 0.75 - 0, side: 'B'},
      { type: 'trace', dx: -2.55+3.25, side: 'B'}
    );

    const vdd = fn({ start: [-2.55, 0.75], net: p.VDD.index, traceWidth: 0.5 },
      { type: 'trace', dx: -4.7 + 2.55, side: 'F' },
      { type: 'via'},
      { type: 'trace', dy: -0.75*2, side: 'B'},
      { type: 'trace', dx: -2.55+4.7, side: 'B'}
    );

    const din = fn({ start: [2.55, -0.75], net: p.DOUT.index },
      { type: 'trace', dx: 3.25-2.55, side: 'B' },
      { type: 'trace', dx: 4-3.25, dy: 0 + 0.75, side: 'B'},
      { type: 'via'},
      { type: 'trace', dx: 3.25-4, dy: 0.75 - 0, side: 'F'},
      { type: 'trace', dx: 2.55-3.25, side: 'F'}
    );

    const gnd = fn({ start: [2.55, -0.75], net: p.VDD.index, traceWidth: 0.5 },
      { type: 'trace', dx: 4.7 - 2.55, side: 'F' },
      { type: 'via'},
      { type: 'trace', dy: 0.75*2, side: 'B'},
      { type: 'trace', dx: 2.55-4.7, side: 'B'}
    );

    standard += dout;
    standard += vdd;
    standard += din;
    standard += gnd;

    return standard;
  }
}
