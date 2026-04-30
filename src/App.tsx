import { BrowserRouter, Route, Routes } from 'react-router'
import { ThemeProvider } from './state/ThemeContext.tsx'
import { AgentRuntimeProvider } from './state/AgentRuntimeContext.tsx'
import { Layout } from './routes/Layout.tsx'
import { EmptyHome } from './routes/EmptyHome.tsx'
import { RepoView } from './routes/RepoView.tsx'

export default function App() {
  return (
    <ThemeProvider>
      <AgentRuntimeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<EmptyHome />} />
              <Route path="repo/:repoSlug" element={<RepoView />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AgentRuntimeProvider>
    </ThemeProvider>
  )
}
