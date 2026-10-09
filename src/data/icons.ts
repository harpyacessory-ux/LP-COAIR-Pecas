/**
 * Catálogo de ícones da LP (sprite inline, 24×24, stroke 1.6, currentColor).
 * Para adicionar um ícone: nova chave aqui, só com <path>/<circle>/<rect>/<line> sem atributos de cor.
 * O PROMPT-PADRAO-LP lista estas chaves como opções na entrevista.
 */
export const iconPaths = {
  search: '<circle cx="11" cy="11" r="7"/><path class="ic-accent" d="m20 20-3.6-3.6"/>',
  'arrow-right': '<path d="M4 12h16"/><path d="m13 5 7 7-7 7"/>',
  'arrow-down': '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path class="ic-accent" d="m3 13 9 5 9-5"/>',
  'badge-check':
    '<path d="M12 3.5 14.4 5l2.8-.6 1.2 2.6 2.6 1.2-.6 2.8 1.6 2.4-1.6 2.4.6 2.8-2.6 1.2-1.2 2.6-2.8-.6L12 22.9l-2.4-1.6-2.8.6-1.2-2.6-2.6-1.2.6-2.8L2 12.4l1.6-2.4-.6-2.8 2.6-1.2L6.8 3.4l2.8.6L12 3.5Z"/><path class="ic-accent" d="m9 12.5 2 2 4-4.5"/>',
  users:
    '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c.7-3.4 3-5.2 5.5-5.2s4.8 1.8 5.5 5.2"/><circle cx="17.5" cy="9" r="2.4"/><path d="M15.6 14.6c2.2.3 3.9 1.9 4.5 4.9"/>',
  circle: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.6"/>',
  cylinder:
    '<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6"/>',
  sliders:
    '<path d="M4 6h9M17 6h3M4 12h3M9 12h11M4 18h13M19 18h1"/><circle cx="14" cy="6" r="2"/><circle cx="7" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
  tag: '<path d="m20.5 12.7-8.2-8.2A2.7 2.7 0 0 0 10.4 3.7H6.2A2.7 2.7 0 0 0 3.5 6.4v4.2c0 .7.3 1.4.8 1.9l8.2 8.2c1 1 2.7 1 3.7 0l4.3-4.3c1-1 1-2.7 0-3.7Z"/><circle cx="8" cy="8.5" r="1.4"/>',
  hash: '<path d="M9 3.5 7 20.5M17 3.5l-2 17M4 8.5h16M3.4 15.5h16"/>',
  camera:
    '<path d="M4 8h2.6L8 5.5h8L17.4 8H20a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.5" r="3.5"/>',
  ruler:
    '<path d="m3.5 15.5 5-5 15 15-5 5-15-15Z"/><path d="m8.5 10.5 2 2M11.5 7.5l2 2M14.5 4.5l2 2"/>',
  box: '<path d="M12 3.3 20.5 8v8L12 20.7 3.5 16V8L12 3.3Z"/><path d="M3.5 8 12 12.5 20.5 8M12 12.5V20.7"/>',
  target:
    '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.8"/>',
  bolt: '<path d="M12.5 3 5 13.5h5.5L11 21l7.5-11H13l-.5-7Z"/>',
  droplet: '<path d="M12 3.5s6.5 7.2 6.5 11.5A6.5 6.5 0 0 1 5.5 15c0-4.3 6.5-11.5 6.5-11.5Z"/>',
  gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 3.5v2.3M12 18.2v2.3M20.5 12h-2.3M5.8 12H3.5M17.8 6.2l-1.6 1.6M7.8 16.2l-1.6 1.6M17.8 17.8l-1.6-1.6M7.8 7.8 6.2 6.2"/>',
  /** Engrenagem com dentes (a `gear` é a versão em raios). */
  cog: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  fan: '<path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><path d="M12 12v.01"/>',
  conveyor:
    '<rect x="2.5" y="11.5" width="19" height="7" rx="3.5"/><circle cx="6.5" cy="15" r="1.2"/><circle cx="12" cy="15" r="1.2"/><circle cx="17.5" cy="15" r="1.2"/><path d="M5 11.5V8h4.5v3.5M13.5 11.5V6h5v5.5"/>',
  filter:
    '<rect x="6" y="3.5" width="12" height="17" rx="2.5"/><path d="M9.5 7.5v9M12 7.5v9M14.5 7.5v9"/>',
  hexagon: '<path d="M12 2.8 20 7.4v9.2l-8 4.6-8-4.6V7.4Z"/><circle cx="12" cy="12" r="3"/>',
  valve: '<path d="M2.5 11H7v6H2.5zM17 11h4.5v6H17zM7 12.5h10v3H7zM12 12.5v-5M8.5 7.5h7"/>',
  wind: '<path d="M3 8h10a2.5 2.5 0 1 0-2.5-2.5"/><path d="M3 12h15a2.5 2.5 0 1 1-2.5 2.5"/><path d="M3 16h8"/>',
  waves:
    '<path d="M3 7.5c1.5-1.2 3-1.2 4.5 0s3 1.2 4.5 0 3-1.2 4.5 0 3 1.2 4.5 0M3 12c1.5-1.2 3-1.2 4.5 0s3 1.2 4.5 0 3-1.2 4.5 0 3 1.2 4.5 0M3 16.5c1.5-1.2 3-1.2 4.5 0s3 1.2 4.5 0 3-1.2 4.5 0 3 1.2 4.5 0"/>',
  coalescent:
    '<circle cx="12" cy="12" r="8.5" stroke-dasharray="2.4 2.6"/><circle cx="12" cy="12" r="2.6"/>',
  gauge:
    '<circle cx="12" cy="12" r="8.5"/><path d="m12 12 3.8-3.8"/><circle cx="12" cy="12" r="1.2"/>',
  'arrows-swap': '<path d="M4 8.5h15M15.5 5 19 8.5 15.5 12M20 15.5H5M8.5 12 5 15.5 8.5 19"/>',
  headset:
    '<path d="M4 14.5V12a8 8 0 0 1 16 0v2.5"/><rect x="3" y="13.5" width="4" height="6" rx="1.5"/><rect x="17" y="13.5" width="4" height="6" rx="1.5"/><path d="M19 19.5c0 1.2-1.6 2-4 2h-2.5"/>',
  move: '<path d="M3.5 12h17M6 8.5 3.5 12 6 15.5M18 8.5 20.5 12 18 15.5"/>',
  mountain: '<path d="m3.5 18.5 6-10 4 6.2 2-3 5 6.8Z"/><circle cx="16" cy="6.5" r="1.6"/>',
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="0.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="0.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="0.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="0.6"/>',
  crosshair: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3"/>',
  utensils:
    '<path d="M6 3.5v7M4.3 3.5v4.4c0 .9.7 1.6 1.7 1.6s1.7-.7 1.7-1.6V3.5M6 10.5v10M17.5 3.5c-1.7 0-3 2-3 5.2 0 2 1 3 2.2 3.4v8.4"/>',
  disc: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2"/>',
  'settings-2':
    '<path d="M3.5 7h5.5M12.5 7h8"/><circle cx="11" cy="7" r="2"/><path d="M3.5 17h10.5M18 17h2.5"/><circle cx="16" cy="17" r="2"/>',
  'file-text':
    '<path d="M7 3.5h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z"/><path d="M14 3.5V8h4M9 13h6M9 16.5h6"/>',
  flame:
    '<path d="M12 3.5s3.4 3 3.4 6.4c1-.8 1.4-2 1.4-2s1.7 2.4 1.7 5.1a6.5 6.5 0 0 1-13 0c0-2.8 1.4-4.6 2.6-6 .1 1 .6 1.8 1.2 2.3-.2-2.7 1-4.5 2.7-5.8Z"/>',
  cpu: '<rect x="6.5" y="6.5" width="11" height="11" rx="1"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9.5 3.5v3M14.5 3.5v3M9.5 17.5v3M14.5 17.5v3M3.5 9.5h3M3.5 14.5h3M17.5 9.5h3M17.5 14.5h3"/>',
  'more-horizontal':
    '<circle cx="5.5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18.5" cy="12" r="1.4"/>',
  wrench:
    '<path d="M14.7 6.3a4.5 4.5 0 0 0-6 5.3L3.5 16.8l3.2 3.2 5.2-5.2a4.5 4.5 0 0 0 5.3-6l-2.9 2.9-2.4-.6-.6-2.4 2.9-2.9Z"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.2l3.5 2"/>',
  zap: '<path d="M13 3 6 13.5h5L10 21l7.5-10.5h-5L13 3Z"/>',
  'map-pin':
    '<path d="M12 21.5s7-6.6 7-11.8a7 7 0 1 0-14 0c0 5.2 7 11.8 7 11.8Z"/><circle cx="12" cy="9.7" r="2.4"/>',
  phone:
    '<path d="M6 3.5 9 6l-1.7 2.7a13 13 0 0 0 6 6L15 13l2.5 3c.4.3.5.9.2 1.4-1 1.6-2.9 2.9-4.5 2.6-4.4-.8-9.4-5.8-10.2-10.2-.3-1.6 1-3.5 2.6-4.5.5-.3 1.1-.2 1.4.2Z"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="1.2"/><path d="m4 6.5 8 6.5 8-6.5"/>',
  linkedin:
    '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><circle cx="8" cy="8.3" r="1.1"/><path d="M8 11v6M12 11v6M12 13.5c0-1.4 1-2.5 2.4-2.5S17 12.1 17 13.5V17"/>',
  youtube: '<rect x="3" y="6" width="18" height="12" rx="3"/><path d="m10.5 9.5 5 2.5-5 2.5Z"/>',
  upload:
    '<path d="M12 15V4M8.5 7.5 12 4l3.5 3.5"/><path d="M4.5 15v3.5c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V15"/>',
  building:
    '<path d="M3 21h18"/><path d="M5 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16"/><path d="M17 21v-8a1 1 0 0 1 1.5-.9l1.5.9v8"/><path d="M8 8h2"/><path d="M8 11h2"/><path d="M8 14h2"/>',
  factory:
    '<path class="ic-accent" d="M3 21h18"/><path d="M4 21V9l6 3V9l6 3V5l4 2v14"/><path d="M8 17h.01"/><path d="M12 17h.01"/><path d="M16 17h.01"/><path d="M16 11h.01"/><path d="M12 15h.01"/><path d="M8 13h.01"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="1"/><rect x="10" y="10" width="4" height="4"/><path d="M9 2v3"/><path d="M15 2v3"/><path d="M9 19v3"/><path d="M15 19v3"/><path d="M2 9h3"/><path d="M2 15h3"/><path d="M19 9h3"/><path d="M19 15h3"/>',
  dots: '<path d="M5 12h.01"/><path d="M12 12h.01"/><path d="M19 12h.01"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  'chevron-down': '<path d="m5.5 8.5 6.5 7 6.5-7"/>',
  'chevron-right': '<path d="m9 18 7-6-7-6"/>',
  menu: '<path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17"/>',
  close: '<path d="m5 5 14 14M19 5 5 19"/>',
  instagram:
    '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
  whatsapp:
    '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  shield:
    '<path d="M12 3.3 5.2 6v5.3c0 4.2 2.8 7.9 6.8 9.4 4-1.5 6.8-5.2 6.8-9.4V6L12 3.3Z"/><path d="m9.2 11.9 2 2 3.6-4"/>',
  truck:
    '<rect x="2.8" y="6.8" width="10.6" height="9.4" rx="1"/><path d="M13.4 10.2h3.3l2.8 3v3h-6.1z"/><circle cx="7" cy="18" r="1.7"/><circle cx="16.4" cy="18" r="1.7"/>',
  barcode: '<path d="M4 5v14M7.2 5v14M9.6 5v14M13 5v14M15.4 5v14M18 5v14M20.5 5v14"/>',
  'trend-up': '<path d="M3.5 16.5 9 11l4 4 7.5-8.5"/><path d="M15 6.5h5.5V12"/>',
  power: '<path d="M12 3.5v8"/><path d="M6.6 6.9a8 8 0 1 0 10.8 0"/>',
  refresh: '<path d="M20.2 12a8.2 8.2 0 1 1-2.6-6"/><path d="M20.5 4.2v4.6h-4.6"/>',
  'help-circle':
    '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.8-.9 1.4v.5"/><path d="M12 17h.01"/>',
  alert: '<path d="M12 4.3 21 19.7H3L12 4.3Z"/><path d="M12 10v3.8"/><path d="M12 16.8h.01"/>',
  'clipboard-check':
    '<rect x="5" y="4.5" width="14" height="16" rx="2"/><path d="M9 4.5V3.4c0-.5.4-.9.9-.9h4.2c.5 0 .9.4.9.9v1.1"/><path class="ic-accent" d="m9.2 12.6 2 2 3.6-4"/>',
} as const satisfies Record<string, string>

export type IconName = keyof typeof iconPaths

export const iconNames = Object.keys(iconPaths) as IconName[]
