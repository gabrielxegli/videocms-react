import { Store } from '@tanstack/react-store'

interface ThemeStore {
    theme: Theme
}

type Theme = 'dark' | 'light'

export const themeStore = new Store<ThemeStore>({
    theme: 'dark'
})

export const updateTheme = (theme: Theme) => {
    themeStore.setState(() => ({
        theme
    }))
}
