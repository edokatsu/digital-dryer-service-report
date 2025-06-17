# How I did it

## git clone the repo 
clone the repo from Github
```bash 
git clone <repo URL>
```

## Dryer-Service-Report dir
!!! / make sure to download node.js from this [URL](https://nodejs.org/en/download) first

Start by installing all the "node_modules" components 
Since pnpm is specificly pick to use run this first
```bash 
npm install -g pnpm
```
then run the installation for pnpm with the following command
```bash
pnpm install
```

Here is the result you shall see 
```bash
C:\Users\daniel\Desktop\edwin\dryer-service-report>pnpm install
'pnpm' is not recognized as an internal or external command,
operable program or batch file.

C:\Users\daniel\Desktop\edwin\dryer-service-report>

C:\Users\daniel\Desktop\edwin\dryer-service-report>npm install -g pnpm

added 1 package in 4s

1 package is looking for funding
  run `npm fund` for details

---

C:\Users\daniel\Desktop\edwin\dryer-service-report>pnpm install
Downloading next@14.2.16: 20.70 MB/20.70 MB, done
Downloading @next/swc-win32-x64-msvc@14.2.16: 41.49 MB/41.49 MB, done
Packages: +299
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 308, reused 0, downloaded 299, added 299, done
 WARN  Issues with peer dependencies found
.
└─┬ react-day-picker 8.10.1
  └── ✕ unmet peer date-fns@"^2.28.0 || ^3.0.0": found 4.1.0

dependencies:
+ @hookform/resolvers 3.10.0 (5.1.1 is available)
+ @radix-ui/react-accordion 1.2.2 (1.2.11 is available)
+ @radix-ui/react-alert-dialog 1.1.4 (1.1.14 is available)
+ @radix-ui/react-aspect-ratio 1.1.1 (1.1.7 is available)
+ @radix-ui/react-avatar 1.1.2 (1.1.10 is available)
+ @radix-ui/react-checkbox 1.1.3 (1.3.2 is available)
+ @radix-ui/react-collapsible 1.1.2 (1.1.11 is available)
+ @radix-ui/react-context-menu 2.2.4 (2.2.15 is available)
+ @radix-ui/react-dialog 1.1.14
+ @radix-ui/react-dropdown-menu 2.1.4 (2.1.15 is available)
+ @radix-ui/react-hover-card 1.1.4 (1.1.14 is available)
+ @radix-ui/react-label 2.1.1 (2.1.7 is available)
+ @radix-ui/react-menubar 1.1.4 (1.1.15 is available)
+ @radix-ui/react-navigation-menu 1.2.3 (1.2.13 is available)
+ @radix-ui/react-popover 1.1.4 (1.1.14 is available)
+ @radix-ui/react-progress 1.1.1 (1.1.7 is available)
+ @radix-ui/react-radio-group 1.2.2 (1.3.7 is available)
+ @radix-ui/react-scroll-area 1.2.2 (1.2.9 is available)
+ @radix-ui/react-select 2.1.4 (2.2.5 is available)
+ @radix-ui/react-separator 1.1.1 (1.1.7 is available)
+ @radix-ui/react-slider 1.2.2 (1.3.5 is available)
+ @radix-ui/react-slot 1.1.1 (1.2.3 is available)
+ @radix-ui/react-switch 1.1.2 (1.2.5 is available)
+ @radix-ui/react-tabs 1.1.2 (1.1.12 is available)
+ @radix-ui/react-toast 1.2.14
+ @radix-ui/react-toggle 1.1.1 (1.1.9 is available)
+ @radix-ui/react-toggle-group 1.1.1 (1.1.10 is available)
+ @radix-ui/react-tooltip 1.1.6 (1.2.7 is available)
+ autoprefixer 10.4.21
+ class-variance-authority 0.7.1
+ clsx 2.1.1
+ cmdk 1.0.4 (1.1.1 is available)
+ date-fns 4.1.0
+ embla-carousel-react 8.5.1 (8.6.0 is available)
+ input-otp 1.4.1 (1.4.2 is available)
+ jspdf 3.0.1
+ jspdf-autotable 5.0.2
+ lucide-react 0.454.0 (0.515.0 is available)
+ next 14.2.16 (15.3.3 is available)
+ next-themes 0.4.6
+ react 18.3.1 (19.1.0 is available)
+ react-day-picker 8.10.1 (9.7.0 is available)
+ react-dom 18.3.1 (19.1.0 is available)
+ react-hook-form 7.58.0
+ react-resizable-panels 2.1.9 (3.0.3 is available)
+ recharts 2.15.0 (2.15.3 is available)
+ sonner 1.7.4 (2.0.5 is available)
+ tailwind-merge 2.6.0 (3.3.1 is available)
+ tailwindcss-animate 1.0.7
+ vaul 0.9.9 (1.1.2 is available)
+ zod 3.25.64

devDependencies:
+ @types/node 22.15.31 (24.0.1 is available)
+ @types/react 18.3.23 (19.1.8 is available)
+ @types/react-dom 18.3.7 (19.1.6 is available)
+ postcss 8.5.5
+ tailwindcss 3.4.17 (4.1.10 is available)
+ typescript 5.8.3

╭ Warning ───────────────────────────────────────────────────────────────────────────────────╮
│                                                                                            │
│   Ignored build scripts: core-js.                                                          │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.   │
│                                                                                            │
╰────────────────────────────────────────────────────────────────────────────────────────────╯

Done in 1m 4.8s using pnpm v10.12.1
```
If you can see this, meants you have successfully installed "pnpm"

## Before production deployment online lets test it offline 
lets run the "run dev" to test it on localhost
```bash 
pnpm run dev
```

Here is the result you should see
```bash
C:\Users\daniel\Desktop\edwin\dryer-service-report>pnpm run dev 

> my-v0-project@0.1.0 dev C:\Users\daniel\Desktop\edwin\dryer-service-report
> next dev

  ▲ Next.js 14.2.16
  - Local:        http://localhost:3000

 ✓ Starting...
 ✓ Ready in 2.1s
```
If you see this, it is successfully being deploy to localhost.

!!! / If all the above is successfully deployed in localhost, we can proceed with production deployment online in vercel.