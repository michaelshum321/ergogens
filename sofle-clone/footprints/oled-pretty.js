module.exports = {
    params: {
        designator: 'OLED',
        side: 'F',
        VCC: {type: 'net', value: 'VCC'},
        GND: {type: 'net', value: 'GND'},
        SDA: {type: 'net', value: 'SDA'},
        SCL: {type: 'net', value: 'SCL'}
    },
    body: p => {
        const fn = (pos, neg) => `
            (module OLED (layer ${p.side}.Cu) (tedit 5E1ADAC2)
            ${p.at /* parametric position */}

            ${'' /* footprint reference */}
            (fp_text reference "${p.ref}" (at 0 -0.24) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
            (fp_text value OLED (at 0 -3.81) (layer F.Fab) (effects (font (size 1 1) (thickness 0.15))))

            ${'' /* Fab outline */}
            (fp_line (start ${neg}6 1.5) (end ${neg}6 -36.5) (layer ${p.side}.Fab) (width 0.12))
            (fp_line (start ${neg}6 -36.5) (end ${pos}6 -36.5) (layer ${p.side}.Fab) (width 0.12))
            (fp_line (start ${pos}6 1.5) (end ${pos}6 -36.5) (layer ${p.side}.Fab) (width 0.12))
            (fp_line (start ${pos}6 1.5) (end ${neg}6 1.5) (layer ${p.side}.Fab) (width 0.12))

            ${'' /* Silkscreen line on top of headers */}
            (fp_line (start -5 -1.27) (end 5 -1.27) (layer ${p.side}.SilkS) (width 0.25))

            ${'' /* Header pins */}
            (pad SDA thru_hole circle (at ${neg}3.81 0 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.SDA.str})
            (pad SCL thru_hole circle (at ${neg}1.27 0 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.SCL.str})
            (pad VCC thru_hole circle (at ${pos}1.27 0 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.VCC.str})
            (pad GND thru_hole circle (at ${pos}3.81 0 ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.GND.str})
            )
        `;

        if (p.side === 'F') {
            return fn('', '-');
        } else if (p.side === 'B') {
            return fn('-', '');
        }
    }
}
