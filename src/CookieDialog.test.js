import { DIContainerContext } from "../src/useDIContainer";
import { render as rtlRender, screen } from "@testing-library/react";
import React from "react";
import CookieDialog from "../src/CookieDialog";

describe("<CookieDialog />", () => {
  const diContainerMock = {
    analyticsService: {
      getOptInStatus: jest.fn(),
      optIn: jest.fn(),
      optOut: jest.fn(),
      reset: jest.fn(),
      setUserId: jest.fn(),
      track: jest.fn(),
    },
    errorMonitoringService: {
      enableMonitoring: jest.fn(),
    },
    authService: {
      getCredentials: jest.fn(),
      isLoggedIn: jest.fn(),
      isRedirect: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      redirect: jest.fn(),
    },
  };

  afterEach(() => {
    diContainerMock.analyticsService.getOptInStatus.mockReset();
    diContainerMock.analyticsService.optIn.mockReset();
    diContainerMock.analyticsService.optOut.mockReset();
    diContainerMock.analyticsService.reset.mockReset();
    diContainerMock.analyticsService.setUserId.mockReset();
    diContainerMock.analyticsService.track.mockReset();
    diContainerMock.errorMonitoringService.enableMonitoring.mockReset();
    diContainerMock.authService.getCredentials.mockReset();
    diContainerMock.authService.isLoggedIn.mockReset();
    diContainerMock.authService.isRedirect.mockReset();
    diContainerMock.authService.login.mockReset();
    diContainerMock.authService.logout.mockReset();
    diContainerMock.authService.redirect.mockReset();
  });

  const render = (ui) => {
    return rtlRender(ui, {
      wrapper: ({ children }) => {
        return (
          <DIContainerContext.Provider value={diContainerMock}>
            {children}
          </DIContainerContext.Provider>
        );
      },
    });
  };

  test("given the user hasn't responded to the opt in request then they are viewing the cookie banner", async () => {
    diContainerMock.analyticsService.getOptInStatus.mockResolvedValueOnce(
      "pendingResponse"
    );
    render(<CookieDialog />);

    expect(
      screen.getByRole("heading", {
        name: /i'm the title of the dialog/i,
      })
    ).toBeInTheDocument();
  });
});
