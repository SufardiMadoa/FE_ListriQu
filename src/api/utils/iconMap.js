export const iconMap = {
  dashboard_icon:
    'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  profile_icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  settings_icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0...',
  kegiatan: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0...',
  manatb_icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  default:
    'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4',
}

export function getIconPath(iconName) {
  return iconMap[iconName] || iconMap['default']
}
