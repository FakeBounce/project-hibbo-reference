package com.monimalz;

import android.app.Application;

import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactApplication;
import com.gettipsi.stripe.StripeReactPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import it.innove.BleManagerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.cardio.RNCardIOPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import io.fabric.sdk.android.Fabric;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new StripeReactPackage(),
            new LottiePackage(),
            new BleManagerPackage(),
            new ReactVideoPackage(),
            new ReactNativeFingerprintScannerPackage(),
            new ReactNativeConfigPackage(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new RNCardIOPackage(),
            new RNGoogleSigninPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNFetchBlobPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());

    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);
//    SoLoader.init(this, /* native exopackage */ false);
  }
}
