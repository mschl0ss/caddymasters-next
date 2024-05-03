import { ReactNode } from 'react';

import {
  ButtonList,
  PageWrapper,
} from '@/components/styledComponents';
import Title from '@/components/Title';

export default function GameSetupLayout({
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
