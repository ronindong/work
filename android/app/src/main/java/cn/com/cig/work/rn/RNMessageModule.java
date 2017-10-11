package cn.com.cig.work.rn;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by donghl on 2017/10/10.
 */

public class RNMessageModule extends ReactContextBaseJavaModule {

    public RNMessageModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNMessageModule";
    }


    @ReactMethod
    public void handlerMessage(String type) {
        Toast.makeText(getCurrentActivity(), type, Toast.LENGTH_SHORT).show();

    }


}
