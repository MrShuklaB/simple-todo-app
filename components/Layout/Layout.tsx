import * as React from "react";
import styled from "styled-components";

let Header = styled.header`
  height: 56px;
  text-align: center;
  vertical-align: middle;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

let Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100%;
  min-width: 35ch;
  margin: 4rem auto 0 auto;
`;

let Footer = styled.footer`
  height: 56px;
  padding-top: 16px;
  text-align: center;
  vertical-align: middle;
  border-top: 1px solid hsla(10 10% 50% / 50%);
`;

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Header>
        <h1>React KT Demo</h1>
      </Header>
      <Content>{children}</Content>
      <Footer>Built with Next.js, TypeScript, React Query, & Prisma</Footer>
    </React.Fragment>
  );
}

export default Layout;
