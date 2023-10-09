// Kailh Choc PG1350
// Nets
//    from: corresponds to pin 1
//    to: corresponds to pin 2
// Params
//    hotswap: default is false
//      if true, will include holes and pads for Kailh choc hotswap sockets
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible
//    keycaps: default is false
//      if true, will add choc sized keycap box around the footprint
//
// note: hotswap and reverse can be used simultaneously

module.exports = {
    params: {
      designator: 'S',
      hotswap: false,
      reverse: false,
      keycaps: false,
      from: undefined,
      to: undefined
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

      const standard = `
        (module PG1350 (layer F.Cu) (tedit 5DD50112)
        ${p.at /* parametric position */}

        ${'' /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

        ${''/* corner marks */}
        (fp_line (start -7 -6) (end -7 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -7 7) (end -6 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -6 -7) (end -7 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -7 7) (end -7 6) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 6) (end 7 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 -7) (end 6 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 6 7) (end 7 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 -7) (end 7 -6) (layer Dwgs.User) (width 0.15))

        ${''/* middle shaft */}
        (pad "" np_thru_hole circle (at 0 0) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))

        ${''/* stabilizers */}
        (pad "" np_thru_hole circle (at 5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
        (pad "" np_thru_hole circle (at -5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
        `
      const keycap = `
        ${'' /* keycap marks */}
        (fp_line (start -9 -8.5) (end 9 -8.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start 9 -8.5) (end 9 8.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start 9 8.5) (end -9 8.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start -9 8.5) (end -9 -8.5) (layer Dwgs.User) (width 0.15))
        `
      function pins(def_neg, def_pos, def_side) {
        if(p.hotswap) {
          return `
            ${'' /* holes */}
            (pad "" np_thru_hole circle (at ${def_pos}5 -3.75) (size 3 3) (drill 3) (layers *.Cu *.Mask))
            (pad "" np_thru_hole circle (at 0 -5.95) (size 3 3) (drill 3) (layers *.Cu *.Mask))

            ${'' /* net pads */}
            (pad 1 smd rect (at ${def_neg}3.275 -5.95 ${p.r ?? 0}) (size 2.6 2.6) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask)  ${p.from.str})
            (pad 2 smd rect (at ${def_pos}8.275 -3.75 ${p.r ?? 0}) (size 2.6 2.6) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask)  ${p.to.str})
          `
        } else {
            return `
              ${''/* pins */}
              (pad 1 thru_hole circle (at ${def_pos}5 -3.8) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${p.from.str})
              (pad 2 thru_hole circle (at ${def_pos}0 -5.9) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${p.to.str})
            `
        }
      }
      if(p.reverse) {
        // final += newSegment([fromX + viaXOffset, fromY], [fromX, fromY], 0.25, 'F', p.to.index)
        // final += newSegment([toX - viaXOffset, toY], [toX, toY], 0.25, 'F', p.from.index)
        // (via (at ${getPosition(toX - viaXOffset, 0)}) (size 0.8) (drill 0.4) (layers F.Cu B.Cu) (net ${p.to.index}))
        // (via  (at ${getPosition(fromX + viaXOffset, 0)}) (size 0.8) (drill 0.4) (layers F.Cu B.Cu) (net ${p.from.index}))
        // TODO: Consider something where you can compose segments and vias through offsets
        // args: { type: 'trace', dx, dy, side}, {type: 'via'}
        function fn([startX, startY], ...args) {
          let x = startX;
          let y = startY;
          let output = '';

          args.forEach((curr) => {
            if (curr.type === 'trace') {
              output += newSegment([x, y], [x+(curr.dx ?? 0), y+(curr.dy ?? 0)], 0.25, curr.side, p.from.index);
              x += curr.dx ?? 0;
              y += curr.dy ?? 0;
            } else if (curr.type === 'via') {
              output += newVia([x, y], 0.8, 0.4, p.from.index);
            }
            output += '\n';
          });
          return output;
        }
        return `
          ${standard}
          ${p.keycaps ? keycap : ''}
          ${pins('-', '', 'B')}
          ${pins('', '-', 'F')}
          )
          ${fn([3.275, -5.95],
            // { type: 'trace', dy: 1.065, side: 'F' },
            { type: 'trace', dx: -2.184, dy: 2.184, side: 'F'},
            { type: 'via'},
            { type: 'trace', dx: -(4.37 - 2.185), side: 'B'},
            { type: 'trace', dx: -(6.56-4.37), dy: -(2.2), side:'B'},
          )}
          `
          // ${newSegment([3.275, -5.95], [3.275, -5.95+1.065], 0.25, 'F', p.from.index)}
          // ${newSegment([3.275, -5.95+1.065], [3.275-0.974, -5.95 + 1.065 + (2.039-1.065)], 0.25, 'F', p.from.index)}
          // ${newVia([3.275-0.974, -5.95 + 1.065 + (2.039-1.065)], 0.8, 0.4, p.from.index)}

          // (segment (start -0.01 0) (end -0.01 -1.065) (width 0.25) (layer "F.Cu") (net 0) (tstamp 51ab358e-822c-4517-9502-ed9a068cb596))
          // (segment (start -0.01 -1.065) (end 0.964 -2.039) (width 0.25) (layer "F.Cu") (net 0) (tstamp 0746b36c-5461-44bd-bea1-c98c70b921cc))
          // (via (at 0.964 -2.039) (size 0.4) (drill 0.3) (layers "F.Cu" "B.Cu") (net 0) (tstamp f32e39cc-f8af-48c8-b84e-c8df55111f1c))
          // (segment (start 0.964 -2.039) (end 4.718 -2.039) (width 0.25) (layer "B.Cu") (net 0) (tstamp 5dfca214-272e-499c-8914-22ef1b3cfbf3))
          // (segment (start 4.718 -2.039) (end 5.59 -1.167) (width 0.25) (layer "B.Cu") (net 0) (tstamp 8e0caa4f-7b1e-4c5a-861a-c71cacb87b86))
          // (segment (start 5.59 -1.167) (end 5.59 0) (width 0.25) (layer "B.Cu") (net 0) (tstamp eeb6dfdc-25b1-4b81-8481-67393da08f50))
      } else {
        return `
          ${standard}
          ${p.keycaps ? keycap : ''}
          ${pins('-', '', 'B')})
          `
      }
    }
  }
