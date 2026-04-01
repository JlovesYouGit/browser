"""
Browser Operations Skills
Core browser automation capabilities for the agentic browser system.
"""

import asyncio
import logging
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from enum import Enum
import time
import random

from playwright.async_api import async_playwright, Browser, BrowserContext, Page
from playwright.async_api import TimeoutError as PlaywrightTimeoutError

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class BrowserType(Enum):
    """Supported browser types."""
    CHROMIUM = "chromium"
    FIREFOX = "firefox"
    WEBKIT = "webkit"


@dataclass
class BrowserConfig:
    """Browser configuration settings."""
    browser_type: BrowserType = BrowserType.CHROMIUM
    headless: bool = True
    viewport: Dict[str, int] = None
    user_agent: Optional[str] = None
    ignore_https_errors: bool = True
    timeout: int = 30000
    
    def __post_init__(self):
        if self.viewport is None:
            self.viewport = {"width": 1920, "height": 1080}


@dataclass
class NavigationResult:
    """Result of navigation operation."""
    success: bool
    url: str
    title: str
    status_code: Optional[int] = None
    error_message: Optional[str] = None
    load_time: float = 0.0


class BrowserOperations:
    """Core browser automation operations."""
    
    def __init__(self, config: BrowserConfig):
        self.config = config
        self.browser: Optional[Browser] = None
        self.context: Optional[BrowserContext] = None
        self.page: Optional[Page] = None
        self.playwright = None
        
    async def initialize(self) -> bool:
        """Initialize browser instance."""
        try:
            self.playwright = await async_playwright().start()
            
            # Launch browser based on type
            if self.config.browser_type == BrowserType.CHROMIUM:
                self.browser = await self.playwright.chromium.launch(
                    headless=self.config.headless,
                    ignore_https_errors=self.config.ignore_https_errors,
                    args=[
                        "--disable-blink-features=AutomationControlled",
                        "--disable-features=VizDisplayCompositor",
                        "--disable-dev-shm-usage",
                        "--no-sandbox"
                    ]
                )
            elif self.config.browser_type == BrowserType.FIREFOX:
                self.browser = await self.playwright.firefox.launch(
                    headless=self.config.headless
                )
            else:
                self.browser = await self.playwright.webkit.launch(
                    headless=self.config.headless
                )
            
            # Create browser context
            context_options = {
                "viewport": self.config.viewport,
                "ignore_https_errors": self.config.ignore_https_errors,
            }
            
            if self.config.user_agent:
                context_options["user_agent"] = self.config.user_agent
                
            self.context = await self.browser.new_context(**context_options)
            
            # Create new page
            self.page = await self.context.new_page()
            
            # Set default timeout
            self.page.set_default_timeout(self.config.timeout)
            
            logger.info(f"Browser initialized: {self.config.browser_type.value}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to initialize browser: {e}")
            return False
    
    async def navigate_to(self, url: str, wait_for: str = None) -> NavigationResult:
        """Navigate to a URL."""
        if not self.page:
            raise RuntimeError("Browser not initialized")
        
        start_time = time.time()
        
        try:
            logger.info(f"Navigating to: {url}")
            
            # Navigate to URL
            response = await self.page.goto(url, wait_until="networkidle")
            
            # Wait for specific element if specified
            if wait_for:
                await self.page.wait_for_selector(wait_for, timeout=10000)
            
            load_time = time.time() - start_time
            
            result = NavigationResult(
                success=True,
                url=self.page.url,
                title=await self.page.title(),
                status_code=response.status if response else None,
                load_time=load_time
            )
            
            logger.info(f"Navigation successful: {result.url} ({result.load_time:.2f}s)")
            return result
            
        except PlaywrightTimeoutError as e:
            error_msg = f"Navigation timeout: {e}"
            logger.error(error_msg)
            return NavigationResult(
                success=False,
                url=url,
                title="",
                error_message=error_msg,
                load_time=time.time() - start_time
            )
        except Exception as e:
            error_msg = f"Navigation error: {e}"
            logger.error(error_msg)
            return NavigationResult(
                success=False,
                url=url,
                title="",
                error_message=error_msg,
                load_time=time.time() - start_time
            )
    
    async def click_element(self, selector: str, wait_for: str = None) -> bool:
        """Click an element on the page."""
        if not self.page:
            raise RuntimeError("Browser not initialized")
        
        try:
            logger.info(f"Clicking element: {selector}")
            
            # Wait for element to be visible and clickable
            await self.page.wait_for_selector(selector, state="visible")
            await self.page.click(selector)
            
            # Wait for navigation or specific element if specified
            if wait_for:
                await self.page.wait_for_selector(wait_for, timeout=10000)
            else:
                # Wait a bit for any potential navigation
                await asyncio.sleep(1)
            
            logger.info(f"Successfully clicked: {selector}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to click element {selector}: {e}")
            return False
    
    async def fill_form(self, form_data: Dict[str, str], submit_selector: str = None) -> bool:
        """Fill a form with provided data."""
        if not self.page:
            raise RuntimeError("Browser not initialized")
        
        try:
            logger.info(f"Filling form with {len(form_data)} fields")
            
            for selector, value in form_data.items():
                await self.page.wait_for_selector(selector, state="visible")
                await self.page.fill(selector, value)
                logger.debug(f"Filled {selector}: {value}")
            
            # Submit form if submit selector provided
            if submit_selector:
                await self.page.click(submit_selector)
                logger.info(f"Submitted form via: {submit_selector}")
            
            logger.info("Form filled successfully")
            return True
            
        except Exception as e:
            logger.error(f"Failed to fill form: {e}")
            return False
    
    async def extract_text(self, selector: str = None) -> str:
        """Extract text content from page or specific element."""
        if not self.page:
            raise RuntimeError("Browser not initialized")
        
        try:
            if selector:
                text = await self.page.text_content(selector)
                logger.info(f"Extracted text from {selector}")
            else:
                text = await self.page.evaluate("() => document.body.innerText")
                logger.info("Extracted full page text")
            
            return text or ""
            
        except Exception as e:
            logger.error(f"Failed to extract text: {e}")
            return ""
    
    async def extract_links(self) -> List[Dict[str, str]]:
        """Extract all links from the current page."""
        if not self.page:
            raise RuntimeError("Browser not initialized")
        
        try:
            links = await self.page.evaluate("""
                () => {
                    const links = Array.from(document.querySelectorAll('a[href]'));
                    return links.map(link => ({
                        url: link.href,
                        text: link.innerText.trim(),
                        title: link.title || ''
                    }));
                }
            """)
            
            logger.info(f"Extracted {len(links)} links")
            return links
            
        except Exception as e:
            logger.error(f"Failed to extract links: {e}")
            return []
    
    async def take_screenshot(self, filename: str = None, full_page: bool = True) -> str:
        """Take a screenshot of the current page."""
        if not self.page:
            raise RuntimeError("Browser not initialized")
        
        try:
            if not filename:
                timestamp = int(time.time())
                filename = f"screenshot_{timestamp}.png"
            
            await self.page.screenshot(
                path=filename,
                full_page=full_page
            )
            
            logger.info(f"Screenshot saved: {filename}")
            return filename
            
        except Exception as e:
            logger.error(f"Failed to take screenshot: {e}")
            return ""
    
    async def wait_for_element(self, selector: str, timeout: int = 10000) -> bool:
        """Wait for an element to appear on the page."""
        if not self.page:
            raise RuntimeError("Browser not initialized")
        
        try:
            await self.page.wait_for_selector(selector, timeout=timeout)
            logger.info(f"Element found: {selector}")
            return True
            
        except PlaywrightTimeoutError:
            logger.warning(f"Element not found within timeout: {selector}")
            return False
        except Exception as e:
            logger.error(f"Error waiting for element {selector}: {e}")
            return False
    
    async def scroll_to_bottom(self, delay: float = 1.0) -> bool:
        """Scroll to the bottom of the page."""
        if not self.page:
            raise RuntimeError("Browser not initialized")
        
        try:
            await self.page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await asyncio.sleep(delay)
            logger.info("Scrolled to bottom of page")
            return True
            
        except Exception as e:
            logger.error(f"Failed to scroll: {e}")
            return False
    
    async def get_page_info(self) -> Dict[str, Any]:
        """Get information about the current page."""
        if not self.page:
            raise RuntimeError("Browser not initialized")
        
        try:
            info = await self.page.evaluate("""
                () => {
                    return {
                        url: window.location.href,
                        title: document.title,
                        domain: window.location.hostname,
                        path: window.location.pathname,
                        userAgent: navigator.userAgent,
                        language: navigator.language,
                        cookiesEnabled: navigator.cookieEnabled,
                        online: navigator.onLine,
                        platform: navigator.platform,
                        timestamp: new Date().toISOString()
                    };
                }
            """)
            
            logger.info(f"Page info retrieved for: {info['url']}")
            return info
            
        except Exception as e:
            logger.error(f"Failed to get page info: {e}")
            return {}
    
    async def cleanup(self):
        """Clean up browser resources."""
        try:
            if self.page:
                await self.page.close()
            if self.context:
                await self.context.close()
            if self.browser:
                await self.browser.close()
            if self.playwright:
                await self.playwright.stop()
            
            logger.info("Browser cleanup completed")
            
        except Exception as e:
            logger.error(f"Error during cleanup: {e}")


# Utility functions for common browser operations
async def create_browser_session(config: BrowserConfig) -> BrowserOperations:
    """Create and initialize a new browser session."""
    browser_ops = BrowserOperations(config)
    if await browser_ops.initialize():
        return browser_ops
    else:
        raise RuntimeError("Failed to initialize browser session")


def get_random_user_agent() -> str:
    """Get a random user agent string."""
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0",
        "Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0"
    ]
    return random.choice(user_agents)


def get_viewport_sizes() -> List[Dict[str, int]]:
    """Get common viewport sizes for different devices."""
    return [
        {"width": 1920, "height": 1080},  # Desktop
        {"width": 1366, "height": 768},   # Laptop
        {"width": 768, "height": 1024},   # Tablet
        {"width": 375, "height": 667},    # Mobile
        {"width": 414, "height": 896}     # Mobile Large
    ]


# Example usage
async def main():
    """Example usage of browser operations."""
    config = BrowserConfig(
        browser_type=BrowserType.CHROMIUM,
        headless=True,
        user_agent=get_random_user_agent()
    )
    
    browser_ops = await create_browser_session(config)
    
    try:
        # Navigate to a page
        result = await browser_ops.navigate_to("https://example.com")
        if result.success:
            print(f"Successfully loaded: {result.title}")
            
            # Extract page information
            page_info = await browser_ops.get_page_info()
            print(f"Page info: {page_info}")
            
            # Extract links
            links = await browser_ops.extract_links()
            print(f"Found {len(links)} links")
            
            # Take screenshot
            screenshot = await browser_ops.take_screenshot("example.png")
            print(f"Screenshot saved: {screenshot}")
    
    finally:
        await browser_ops.cleanup()


if __name__ == "__main__":
    asyncio.run(main())
