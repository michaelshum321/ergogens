Things changed here:
* made very right edge cut slightly more to the right to account for 0.3mm gap as defined by JLCPCB
* made connecting top right edge stretch slightly more to reach new right edge position
* same with the other side of the right edge

Things did:
Front: horizontal traces
Back: vertical traces

Except for the MCU, which was a bit of a cluster fuck

Change TRRS Power to RAW since it needs to power the other board. oops!


GNDs between the two MCU footpirnts couldn't connect under the footprint, so GND at the top left had to reach around to do it. oops!
