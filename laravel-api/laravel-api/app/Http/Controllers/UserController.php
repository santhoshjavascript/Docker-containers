<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function profile(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'error' => [
                        'message' => 'We couldn’t find a user with that email address. Please check the email and try again.',
                    ],
                ], 404);
            }

            try {
                $this->client->post('https://crudcrdu.com/log', [
                    'json' => [
                        'action' => 'read',
                        'model' => 'User',
                        'timestamp' => now()->toIso8601String(),
                        'data' => ['email' => $request->email],
                    ],
                ]);
            } catch (\Exception $e) {
                \Log::error('Failed to log CRUD action: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Profile retrieved successfully',
                'data' => ['user' => $user->makeHidden(['password'])],
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Please provide a valid email address to proceed.',
                    'details' => $e->errors(),
                ],
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Something went wrong while retrieving the profile. Please try again later or contact support.',
                    'details' => $e->getMessage(),
                ],
            ], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,' . ($request->user()->id ?? 0),
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'error' => [
                        'message' => 'We couldn’t find a user with that email address. Please check the email and try again.',
                    ],
                ], 404);
            }

            $user->update([
                'name' => $request->name,
                'email' => $request->email,
            ]);

            try {
                $this->client->post('https://crudcrdu.com/log', [
                    'json' => [
                        'action' => 'update',
                        'model' => 'User',
                        'timestamp' => now()->toIso8601String(),
                        'data' => ['name' => $request->name, 'email' => $request->email],
                    ],
                ]);
            } catch (\Exception $e) {
                \Log::error('Failed to log CRUD action: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => ['user' => $user->makeHidden(['password'])],
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Please check your input. The name or email provided is invalid or already in use.',
                    'details' => $e->errors(),
                ],
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Something went wrong while updating the profile. Please try again later or contact support.',
                    'details' => $e->getMessage(),
                ],
            ], 500);
        }
    }

    public function delete(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'error' => [
                        'message' => 'We couldn’t find a user with that email address. Please check the email and try again.',
                    ],
                ], 404);
            }

            $user->delete();

            try {
                $this->client->post('https://crudcrdu.com/log', [
                    'json' => [
                        'action' => 'delete',
                        'model' => 'User',
                        'timestamp' => now()->toIso8601String(),
                        'data' => ['email' => $request->email],
                    ],
                ]);
            } catch (\Exception $e) {
                \Log::error('Failed to log CRUD action: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully',
                'data' => [],
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Please provide a valid email address to proceed.',
                    'details' => $e->errors(),
                ],
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Something went wrong while deleting the user. Please try again later or contact support.',
                    'details' => $e->getMessage(),
                ],
            ], 500);
        }
    }
}