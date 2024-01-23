package com.share_pic;

import com.facebook.react.bridge.JSIModulePackage;
import com.facebook.react.bridge.JSIModuleSpec;
import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactApplicationContext;

import java.util.List;

public class ReanimatedJSIModulePackage implements JSIModulePackage {
    @Override
    public List<JSIModuleSpec> getJSIModules( ReactApplicationContext reactApplicationContext, JavaScriptContextHolder javaScriptContextHolder ) {
        return null;
    }
}
