import React from 'react'
import {
  Box,
  Button,
  Notice,
  NoticeContent,
  NoticeIcon,
  Spacer,
} from 'react-neu'
import styled from 'styled-components'

const PausedLPsNotice: React.FC = () => (
  <Notice>
    <NoticeIcon>💧</NoticeIcon>
    <NoticeContent>
      <StyledNoticeContentInner>
        <span>LP rewards are paused for now, remove your liquidity.</span>
        <Box flex={1} />
        <Spacer size="sm" />
        <Button
          size="sm"
          text="Remove Liquidity"
          href="https://app.uniswap.org/#/remove/0x0AaCfbeC6a24756c20D41914F2caba817C0d8521/0x5dbcf33d8c2e976c6b560249878e6f1491bca25c"
          variant="secondary"
        />
      </StyledNoticeContentInner>
    </NoticeContent>
  </Notice>
)

const StyledNoticeContentInner = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`

export default PausedLPsNotice