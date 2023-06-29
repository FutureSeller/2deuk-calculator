import './globals.css';

import { GlobalNav } from '@/ui/global-nav';
import StyledComponentsRegistry from '@/lib/registry';
import Providers from '@/lib/providers';
import ThemeSwitch from '@/ui/theme-switch';

export const metadata = {
  title: {
    default: '이득 계산기',
    template: '%s | 이득 계산기',
  },
  description: '어떤 상황에서 무엇이 이득인지 도움을 주는 계산기',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <head></head>
      <body className="dark:bg-gray-1100 flex h-screen min-w-[320px] overflow-y-hidden bg-white">
        <Providers>
          <StyledComponentsRegistry>
            <GlobalNav />
            <ThemeSwitch />
            <div className="flex-1 bg-white dark:bg-black lg:pl-72">
              <div className="no-scrollbar relative mx-auto h-full max-w-4xl space-y-8 overflow-y-scroll px-2 pt-20 lg:px-8 lg:py-8">
                <div className="absolute left-0 w-full p-px">
                  <main className="rounded-lg bg-white p-3.5 dark:bg-black lg:p-6">
                    {children}
                  </main>
                </div>
              </div>
            </div>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
