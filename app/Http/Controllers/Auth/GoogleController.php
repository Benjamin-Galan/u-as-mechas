<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    //Redirect to Google for autentication
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    //Handle google callback
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::updateOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'google_id' => $googleUser->getId(),
                    'password' => bcrypt(Str::random(16)), // Generate a random password
                ]
            );

            Auth::login($user);

            return redirect()->intended('/client/dashboard');
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['error' => 'Failed to login with Google.', $e]);
        }
    }
}
