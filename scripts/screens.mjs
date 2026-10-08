#!/usr/bin/env node
/**
 * screens — gera screenshots de página inteira em 360, 768, 1440 e 1920 px
 * (mais 1440/1920 com o overlay ?grid=1 do hero) em docs/screens/.
 *
 * Serve dist/ com `http-server` numa porta dedicada (não usa `astro preview`, que no Astro 7
 * é um daemon e pode estar preso a outra LP). Requer `npm run build` antes e o Chromium
 * do Playwright: `npx -y playwright@1.58.2 install chromium` (uma vez).
 */
import { spawn, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const OUT = join(ROOT, 'docs', 'screens')
const PORT = 4873 // porta dedicada, para não colidir com um `astro dev` aberto em outra LP
const BASE = `http://127.0.0.1:${PORT}`
const WIDTHS = [360, 768, 1440, 1920]
const PLAYWRIGHT = 'playwright@1.58.2'
const SERVER = 'http-server@14'

if (!existsSync(join(ROOT, 'dist', 'index.html'))) {
  console.error('dist/index.html não existe. Rode `npm run build` primeiro.')
  process.exit(1)
}
mkdirSync(OUT, { recursive: true })

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'

const server = spawn(npx, ['-y', SERVER, 'dist', '-p', String(PORT), '-a', '127.0.0.1', '-s'], {
  cwd: ROOT,
  stdio: 'ignore',
  shell: true,
})

const stopServer = () => {
  if (process.platform === 'win32')
    spawnSync('taskkill', ['/pid', String(server.pid), '/t', '/f'], { stdio: 'ignore' })
  else server.kill()
}

// Espera o servidor e garante que ele serve ESTE projeto (meta b2-lp-standard no HTML).
const wait = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(BASE)
      if (r.ok) {
        const html = await r.text()
        if (!html.includes('name="b2-lp-standard"'))
          throw new Error(`a porta ${PORT} está servindo outra página. Feche o outro servidor.`)
        return
      }
    } catch (e) {
      if (String(e.message).includes('outra página')) throw e
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error('servidor não respondeu em 30s')
}

const shot = (rawUrl, width, file) => {
  // Aspas obrigatórias: com shell: true, o & de ?grid=1&screens=1 encerraria o comando no Windows.
  const url = `"${rawUrl}"`

  const r = spawnSync(
    npx,
    [
      '-y',
      PLAYWRIGHT,
      'screenshot',
      `--viewport-size=${width},900`,
      '--full-page',
      '--wait-for-timeout=1500',
      url,
      file,
    ],
    { cwd: ROOT, stdio: 'inherit', shell: true },
  )
  if (r.status !== 0)
    throw new Error(
      `falha ao capturar ${file} (Chromium instalado? npx -y ${PLAYWRIGHT} install chromium)`,
    )
  console.log('ok', file)
}

try {
  await wait()
  // ?screens=1 faz o layout promover as imagens lazy a eager: sem isso a captura de
  // página inteira sai com buracos brancos onde estavam as fotos abaixo da dobra.
  for (const w of WIDTHS) shot(`${BASE}/?screens=1`, w, join(OUT, `${w}.png`))
  shot(`${BASE}/?grid=1&screens=1`, 1440, join(OUT, '1440-grid.png'))
  shot(`${BASE}/?grid=1&screens=1`, 1920, join(OUT, '1920-grid.png'))
  console.log(`\nscreens — ${WIDTHS.length + 2} capturas em docs/screens/`)
} catch (e) {
  console.error(e.message)
  process.exitCode = 1
} finally {
  stopServer()
  setTimeout(() => process.exit(process.exitCode ?? 0), 200)
}
