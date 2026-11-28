package com.pizzapizza.hotandfresh;

import android.os.Bundle;
import android.webkit.CookieManager;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        if (getPackageName() != null && getPackageName().contains("admin")) {
            try {
                CookieManager.getInstance().setCookie("https://localhost", "pizza_app_mode=admin; path=/");
                CookieManager.getInstance().setCookie("http://localhost", "pizza_app_mode=admin; path=/");
            } catch (Exception ignored) {}
        }
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onResume() {
        super.onResume();
        if (getPackageName() != null && getPackageName().contains("admin") && getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().evaluateJavascript(
                "window.__PIZZA_APP_MODE__ = 'admin'; window.dispatchEvent(new CustomEvent('pizza-mode-change', { detail: 'admin' }));",
                null
            );
        }
    }
}
