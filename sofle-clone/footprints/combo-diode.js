// Author: Ergogen + @infused-kim improvements
//
// @infused-kim's improvements:
//  - Added option to hide thru-holes
//  - Added virtual attribute to silence DRC error

module.exports = {
    params: {
        designator: 'D',
        include_via: true,
        reversible: false,
        side: 'B',
        from: undefined,
        to: undefined,
        include_via: true,
        include_via_traces: true,
    },
    body: p => {
        const fromX = 1.65;
        const fromY = 0;
        const toX = -1.65;
        const toY = 0;

        const viaXOffset = 1.5; // either +1 or -1, depending on from / to

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
        const newSegment = (start, end, width, layer, net) => `(segment (start ${getPosition(start[0], start[1])}) (end ${getPosition(end[0], end[1])}) (width ${width}) (layer ${layer}.Cu) (net ${net}))`


        const standard_opening = `
        (module ComboDiode (layer ${p.side}.Cu) (tedit 5B24D78E)
            ${p.at /* parametric position */}
            (fp_text reference "${p.ref}" (at 0 0) (layer ${p.side}.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        `
        const front = `
            (fp_line (start 0.25 0) (end 0.75 0) (layer F.SilkS) (width 0.1))
            (fp_line (start 0.25 0.4) (end -0.35 0) (layer F.SilkS) (width 0.1))
            (fp_line (start 0.25 -0.4) (end 0.25 0.4) (layer F.SilkS) (width 0.1))
            (fp_line (start -0.35 0) (end 0.25 -0.4) (layer F.SilkS) (width 0.1))
            (fp_line (start -0.35 0) (end -0.35 0.55) (layer F.SilkS) (width 0.1))
            (fp_line (start -0.35 0) (end -0.35 -0.55) (layer F.SilkS) (width 0.1))
            (fp_line (start -0.75 0) (end -0.35 0) (layer F.SilkS) (width 0.1))
            (pad 1 smd rect (at ${fromX} ${fromY} ${p.rot}) (size 0.9 1.2) (layers F.Cu F.Paste F.Mask) ${p.from.str})
            (pad 2 smd rect (at ${toX} ${toY} ${p.rot}) (size 0.9 1.2) (layers F.Cu F.Paste F.Mask) ${p.to.str})
        `
        const back = `
            (fp_line (start 0.25 0) (end 0.75 0) (layer B.SilkS) (width 0.1))
            (fp_line (start 0.25 0.4) (end -0.35 0) (layer B.SilkS) (width 0.1))
            (fp_line (start 0.25 -0.4) (end 0.25 0.4) (layer B.SilkS) (width 0.1))
            (fp_line (start -0.35 0) (end 0.25 -0.4) (layer B.SilkS) (width 0.1))
            (fp_line (start -0.35 0) (end -0.35 0.55) (layer B.SilkS) (width 0.1))
            (fp_line (start -0.35 0) (end -0.35 -0.55) (layer B.SilkS) (width 0.1))
            (fp_line (start -0.75 0) (end -0.35 0) (layer B.SilkS) (width 0.1))
            (pad 1 smd rect (at ${fromX} ${fromY} ${p.rot}) (size 0.9 1.2) (layers B.Cu B.Paste B.Mask) ${p.from.str})
            (pad 2 smd rect (at ${toX} ${toY} ${p.rot}) (size 0.9 1.2) (layers B.Cu B.Paste B.Mask) ${p.to.str})
        `
        const standard_closing = `
        )
        `

        const via = `
            (via (at ${getPosition(toX - viaXOffset, 0)}) (size 0.8) (drill 0.4) (layers F.Cu B.Cu) (net ${p.to.index}))
            (via  (at ${getPosition(fromX + viaXOffset, 0)}) (size 0.8) (drill 0.4) (layers F.Cu B.Cu) (net ${p.from.index}))
        `;

        let final = standard_opening;

        if(p.side == "F" || p.reversible) {
            final += front;
        }
        if(p.side == "B" || p.reversible) {
            final += back;
        }

        final += standard_closing;
        if(p.include_via) {
            final += via;
            if (p.include_via_traces) {
                if(p.side == "F" || p.reversible) {
                    final += newSegment([fromX + viaXOffset, fromY], [fromX, fromY], 0.25, 'F', p.to.index)
                    final += newSegment([toX - viaXOffset, toY], [toX, toY], 0.25, 'F', p.from.index)
                }
                if(p.side == "B" || p.reversible) {
                    final += newSegment([fromX + viaXOffset, fromY], [fromX, fromY], 0.25, 'B', p.to.index)
                    final += newSegment([toX - viaXOffset, toY], [toX, toY], 0.25, 'B', p.from.index)
                }
            }
        }

        return final;
    }
}
