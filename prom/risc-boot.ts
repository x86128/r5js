'use strict'

const BootRom = new Uint32Array([
0xE7000151,
0x00000000,
0x00000000,
0x00000000,
0x00000000,
0x00000000,
0x00000000,
0x00000000,
0x4EE90014,
0xAFE00000,
0xA0E00004,
0x40000000,
0xA0E00008,
0x40000004,
0xA0E00010,
0x80E00010,
0x40090001,
0xA0E00010,
0x5000FFCC,
0x80000000,
0x40030001,
0xE8FFFFFC,
0x5000FFC8,
0x80000000,
0xA0E0000C,
0x80E00008,
0x81E0000C,
0x00080001,
0x40030008,
0xA0E00008,
0x80E00010,
0xE9FFFFEF,
0x80E00008,
0x81E00004,
0xA0100000,
0x8FE00000,
0x4EE80014,
0xC700000F,
0x4EE90010,
0xAFE00000,
0x40E80004,
0xF7FFFFDE,
0x80E00004,
0x40090000,
0xE6000012,
0x40E80008,
0xF7FFFFD9,
0x40E8000C,
0xF7FFFFD7,
0x80E00008,
0x81E0000C,
0xA1000000,
0x80E00008,
0x40080004,
0xA0E00008,
0x80E00004,
0x40090004,
0xA0E00004,
0x80E00004,
0xE9FFFFF3,
0x40E80004,
0xF7FFFFCA,
0xE7FFFFEB,
0x8FE00000,
0x4EE80010,
0xC700000F,
0x4EE90008,
0xAFE00000,
0xA0E00004,
0x5000FFD4,
0x41000000,
0xA1000000,
0x80E00004,
0x40090000,
0xE600000B,
0x80E00004,
0x40090001,
0xA0E00004,
0x5000FFD0,
0x5100FFFF,
0xA1000000,
0x5000FFD4,
0x80000000,
0x40030001,
0xE8FFFFFC,
0xE7FFFFF2,
0x8FE00000,
0x4EE80008,
0xC700000F,
0x4EE90008,
0xAFE00000,
0xA0E00004,
0x5000FFD4,
0x41000001,
0xA1000000,
0x5000FFD0,
0x81E00004,
0xA1000000,
0x5000FFD4,
0x80000000,
0x40030001,
0xE8FFFFFC,
0x8FE00000,
0x4EE80008,
0xC700000F,
0x4EE90018,
0xAFE00000,
0xA0E00004,
0xA1E00008,
0x40000001,
0xF7FFFFD3,
0x5000FFD0,
0x80000000,
0xA0E00010,
0x80E00010,
0x400900FF,
0xE9FFFFF8,
0x400000FF,
0xF7FFFFE2,
0x5000FFD0,
0x80000000,
0xA0E00010,
0x80E00010,
0x400900FF,
0xE9FFFFF8,
0x80E00004,
0x40090008,
0xE9000003,
0x40000087,
0xA0E00014,
0xE7000007,
0x80E00004,
0xE9000003,
0x40000095,
0xA0E00014,
0xE7000002,
0x400000FF,
0xA0E00014,
0x80E00004,
0x4004003F,
0x40080040,
0xF7FFFFCB,
0x40000018,
0x41090000,
0xE5000008,
0xA0E0000C,
0x80E00008,
0x81E0000C,
0x00030001,
0xF7FFFFC3,
0x80E0000C,
0x5008FFF8,
0xE7FFFFF6,
0x80E00014,
0xF7FFFFBE,
0x40000020,
0xA0E0000C,
0x400000FF,
0xF7FFFFBA,
0x5000FFD0,
0x80000000,
0xA0E00010,
0x80E0000C,
0x40090001,
0xA0E0000C,
0x80E00010,
0x40090080,
0xE5000002,
0x80E0000C,
0xE9FFFFF3,
0x8FE00000,
0x4EE80018,
0xC700000F,
0x4EE9000C,
0xAFE00000,
0x40000009,
0xF7FFFF91,
0x40000000,
0x41000000,
0xF7FFFFB5,
0x40000008,
0x410001AA,
0xF7FFFFB2,
0x5000FFFF,
0xF7FFFFA0,
0x5000FFFF,
0xF7FFFF9E,
0x5000FFFF,
0xF7FFFF9C,
0x40000037,
0x41000000,
0xF7FFFFA9,
0x40000029,
0x41000001,
0x4111001E,
0xF7FFFFA5,
0x5000FFD0,
0x80000000,
0xA0E00004,
0x5000FFFF,
0xF7FFFF90,
0x5000FFFF,
0xF7FFFF8E,
0x5000FFFF,
0xF7FFFF8C,
0x40002710,
0xF7FFFF73,
0x80E00004,
0xE9FFFFEC,
0x40000010,
0x41000200,
0xF7FFFF95,
0x40000001,
0xF7FFFF6C,
0x8FE00000,
0x4EE8000C,
0xC700000F,
0x4EE9000C,
0xAFE00000,
0xA0E00004,
0x4000003A,
0x41000000,
0xF7FFFF8A,
0x5000FFD0,
0x80000000,
0xA0E00008,
0x5000FFFF,
0xF7FFFF75,
0x80E00008,
0xE9000004,
0x5000FFD0,
0x80000000,
0x40030007,
0xE0000005,
0x80E00004,
0x80000000,
0x40010009,
0x81E00004,
0xA0100000,
0x5000FFFF,
0xF7FFFF68,
0x5000FFFF,
0xF7FFFF66,
0x40000001,
0xF7FFFF4D,
0x8FE00000,
0x4EE8000C,
0xC700000F,
0x4EE90014,
0xAFE00000,
0xA0E00004,
0xA1E00008,
0x40E80004,
0xF7FFFFDB,
0x40000011,
0x81E00004,
0xF7FFFF68,
0x40000000,
0xA0E0000C,
0x5000FFFF,
0xF7FFFF54,
0x5000FFD0,
0x80000000,
0xA0E00010,
0x80E0000C,
0x40080001,
0xA0E0000C,
0x80E00010,
0x400900FE,
0xE9FFFFF5,
0x5000FFD4,
0x41000005,
0xA1000000,
0x40000000,
0x410901FC,
0xEE000014,
0xA0E0000C,
0x5000FFD0,
0x5100FFFF,
0xA1000000,
0x5000FFD4,
0x80000000,
0x40030001,
0xE8FFFFFC,
0x5000FFD0,
0x80000000,
0xA0E00010,
0x80E00008,
0x81E00010,
0xA1000000,
0x80E00008,
0x40080004,
0xA0E00008,
0x80E0000C,
0x40080004,
0xE7FFFFEA,
0x400000FF,
0xF7FFFF2F,
0x400000FF,
0xF7FFFF2D,
0x40000001,
0xF7FFFF14,
0x8FE00000,
0x4EE80014,
0xC700000F,
0x4EE90014,
0xAFE00000,
0x60000008,
0x40060004,
0xA0E00004,
0x80E00004,
0x41000000,
0xF7FFFFBF,
0x40000010,
0x80000000,
0xA0E00010,
0x80E00004,
0x40080001,
0xA0E00004,
0x40000200,
0xA0E00008,
0x80E00008,
0x81E00010,
0x00090001,
0xED00000A,
0x80E00004,
0x81E00008,
0xF7FFFFB0,
0x80E00004,
0x40080001,
0xA0E00004,
0x80E00008,
0x40080200,
0xA0E00008,
0xE7FFFFF2,
0x8FE00000,
0x4EE80014,
0xC700000F,
0x4D000000,
0x5E00FFC0,
0x6E000008,
0x4C000020,
0x0000000F,
0x40090000,
0xE9000012,
0x40000080,
0x5100FFC4,
0xA0100000,
0xF7FFFF50,
0x5000FFC4,
0x80000000,
0x40030001,
0xE8000005,
0x40000081,
0x5100FFC4,
0xA0100000,
0xF7FFFEC1,
0xE7000004,
0x40000082,
0x5100FFC4,
0xA0100000,
0xF7FFFFC7,
0xE7000008,
0x5000FFC4,
0x80000000,
0x40030001,
0xE8000004,
0x40000081,
0x5100FFC4,
0xA0100000,
0xF7FFFEB3,
0x4000000C,
0x6100000E,
0x41167EF0,
0xA1000000,
0x40000018,
0x61000008,
0xA1000000,
0x40000084,
0x5100FFC4,
0xA0100000,
0x40000000,
0xC7000000,
])

export default BootRom;