import { useEffect } from 'react'
import { useMediaPredicate } from 'react-media-hook'
import { updateTheme } from '../stores/theme'

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const preferredTheme = useMediaPredicate('(prefers-color-scheme: dark)')

    useEffect(() => {
        updateTheme(preferredTheme ? 'dark' : 'light')

        document.documentElement.classList.toggle('dark', preferredTheme)
    }, [preferredTheme])

    return <>{children}</>
}
