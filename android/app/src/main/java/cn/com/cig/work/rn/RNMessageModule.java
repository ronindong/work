package cn.com.cig.work.rn;

import android.widget.Toast;

import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by donghl on 2017/10/10.
 */

public class RNMessageModule extends ReactContextBaseJavaModule {

    ReactApplicationContext reactApplicationContext;

    public RNMessageModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactApplicationContext = reactContext;
        setupLifecycleListener(reactContext);
    }

    @Override
    public void initialize() {
        super.initialize();
        sendMessage("init RNMessageModule");
    }

    private void setupLifecycleListener(ReactApplicationContext reactContext) {

        reactContext.addActivityEventListener(new BaseActivityEventListener() {

        });

        reactContext.addLifecycleEventListener(new LifecycleEventListener() {
            @Override
            public void onHostResume() {
                sendMessage("onHostResume");
            }

            @Override
            public void onHostPause() {
                sendMessage("onHostPause");
            }

            @Override
            public void onHostDestroy() {
                sendMessage("onHostDestroy");
            }
        });
    }

    @Override
    public String getName() {
        return "RNMessageModule";
    }


    /**
     * Android处理RN发送消息
     * <p>
     * 回调参数的对应关系，java -> js
     * Boolean -> Bool
     * Integer -> Number
     * Double -> Number
     * Float -> Number
     * String -> String
     * Callback -> function
     * ReadableMap -> Object
     * ReadableArray -> Array   </p>
     *
     * @param type
     */
    @ReactMethod
    public void handlerMessage(String type) {
        Toast.makeText(getCurrentActivity(), type, Toast.LENGTH_SHORT).show();


    }

    /**
     * Android回调RN函数function
     *
     * @param msg
     * @param callback
     */
    @ReactMethod
    public void handlerCallback(String msg, Callback callback) {
        callback.invoke(msg);
    }

    /**
     * Android实现promise机制
     *
     * @param msg
     * @param promise
     */
    @ReactMethod
    public void handlerPromise(String msg, Promise promise) {
        try {
            promise.resolve(msg);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    public void sendMessage(String msg) {
        reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("AndroidToRNMessage", msg);
    }

}
