package com.pizzapizza.hotandfresh;

import android.os.Bundle;
import android.webkit.CookieManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            CookieManager cookieManager = CookieManager.getInstance();
            cookieManager.setAcceptCookie(true);
            if (getPackageName() != null && getPackageName().contains("admin")) {
                cookieManager.setCookie("https://localhost", "pizza_app_mode=admin; path=/");
                cookieManager.setCookie("http://localhost", "pizza_app_mode=admin; path=/");
            }
        } catch (Exception ignored) {}
    }

    @Override
    public void onResume() {
        super.onResume();
        try {
            if (getPackageName() != null && getPackageName().contains("admin") && getBridge() != null && getBridge().getWebView() != null) {
                getBridge().getWebView().post(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            getBridge().getWebView().evaluateJavascript(
                                "window.__PIZZA_APP_MODE__ = 'admin'; window.dispatchEvent(new CustomEvent('pizza-mode-change', { detail: 'admin' }));",
                                null
                            );
                        } catch (Exception ignored) {}
                    }
                });
            }
        } catch (Exception ignored) {}
    }
}
