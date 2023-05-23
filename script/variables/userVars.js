// ==================================================================
// NOTE: Colors must be in hex format. (no rgb, rgba, etc.)
// ==================================================================

export let defaultUserVars = {
  fonts: {
    fontScale: 1.5,
    fontWeight: 'normal',
    textColors: {
      normal: '#000000',
      accent: '#ff0000',
    },
  },
  selectLayout: {
    layout: 'Outlook_default', // Outlook_default | Custom_layout
  },
  customLayout: {
    ctrlBarWidth: 20,
    ctrlTriggerShort: 10,
    ctrlTriggerTall: 80,

    // Control bar content
    ctrlTriggerBg: {
      triggerPrefs: '#ff0000',
      triggerTopPanes: '#0000ff',
      triggerNavpane: '#00ff00',
      triggerLeftRail: '#f500d4',
    },
  },
}
