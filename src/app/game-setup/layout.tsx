import { ReactNode } from 'react';

import {
  ButtonList,
  PageWrapper,
} from '@/app/game-setup/styledComponents';
import Title from '@/components/Title';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <PageWrapper>
      <Title />
      <ButtonList>
        {children}
      </ButtonList>
    </PageWrapper>
  );
}
