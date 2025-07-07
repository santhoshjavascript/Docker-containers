<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Handle user registration and issue a Sanctum token.
     */
    public function register(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
            ]);

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            // Log CRUD action to crudcrud.com
            $this->logCrudAction('create', 'User', $user->id, [
                'name' => $user->name,
                'email' => $user->email,
                'bio' => $user->bio ?? '',
            ]);

            return response()->json([
                'success' => true,
                'data' => [
                    'token' => $token,
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'created_at' => $user->created_at->toIso8601String(),
                        'bio' => $user->bio ?? '',
                    ],
                ],
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Validation failed. Check your input.',
                    'details' => $e->errors(),
                ],
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Registration failed. Please try again later.',
                    'details' => $e->getMessage(),
                ],
            ], 500);
        }
    }

    /**
     * Handle user login and issue a Sanctum token.
     */
    public function login(Request $request)
    {
        try {
            $data = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            if (Auth::attempt($data)) {
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;

                // Log CRUD action to crudcrud.com
                $this->logCrudAction('login', 'User', $user->id, [
                    'name' => $user->name,
                    'email' => $user->email,
                    'bio' => $user->bio ?? '',
                ]);

                return response()->json([
                    'success' => true,
                    'data' => [
                        'token' => $token,
                        'user' => [
                            'id' => $user->id,
                            'name' => $user->name,
                            'email' => $user->email,
                            'created_at' => $user->created_at->toIso8601String(),
                            'bio' => $user->bio ?? '',
                        ],
                    ],
                ], 200);
            }

            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Invalid email or password.',
                ],
            ], 401);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Invalid email or password format.',
                    'details' => $e->errors(),
                ],
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Login failed. Please try again later.',
                    'details' => $e->getMessage(),
                ],
            ], 500);
        }
    }

    /**
     * Handle user logout by revoking the current token.
     */
    public function logout(Request $request)
    {
        try {
            $user = $request->user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'error' => [
                        'message' => 'Unauthorized. Please provide a valid token.',
                    ],
                ], 401);
            }

            // Log CRUD action to crudcrud.com
            $this->logCrudAction('logout', 'User', $user->id, [
                'name' => $user->name,
                'email' => $user->email,
                'bio' => $user->bio ?? '',
            ]);

            $user->currentAccessToken()->delete();

            return response()->json([
                'success' => true,
                'data' => [],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Logout failed. Please try again later.',
                    'details' => $e->getMessage(),
                ],
            ], 500);
        }
    }

    /**
     * Get the authenticated user's profile.
     */
    public function profile(Request $request)
    {
        try {
            $user = $request->user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'error' => [
                        'message' => 'Unauthorized. Please provide a valid token.',
                    ],
                ], 401);
            }

            // Log CRUD action to crudcrud.com (optional)
            $this->logCrudAction('read', 'User', $user->id, [
                'name' => $user->name,
                'email' => $user->email,
                'bio' => $user->bio ?? '',
            ]);

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'created_at' => $user->created_at->toIso8601String(),
                        'bio' => $user->bio ?? '',
                    ],
                ],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Failed to retrieve profile. Please try again later.',
                    'details' => $e->getMessage(),
                ],
            ], 500);
        }
    }

    /**
     * Update the authenticated user's profile.
     */
    public function updateProfile(Request $request)
    {
        try {
            $user = $request->user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'error' => [
                        'message' => 'Unauthorized. Please provide a valid token.',
                    ],
                ], 401);
            }

            $data = $request->validate([
                'name' => 'sometimes|string|max:255',
                'bio' => 'sometimes|string|nullable',
            ]);

            $user->update($data);

            // Log CRUD action to crudcrud.com
            $this->logCrudAction('update', 'User', $user->id, [
                'name' => $user->name,
                'email' => $user->email,
                'bio' => $user->bio ?? '',
            ]);

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'created_at' => $user->created_at->toIso8601String(),
                        'bio' => $user->bio ?? '',
                    ],
                ],
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Invalid input for profile update.',
                    'details' => $e->errors(),
                ],
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Failed to update profile. Please try again later.',
                    'details' => $e->getMessage(),
                ],
            ], 500);
        }
    }

    /**
     * Delete the authenticated user's account.
     */
    public function delete(Request $request)
    {
        try {
            $user = $request->user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'error' => [
                        'message' => 'Unauthorized. Please provide a valid token.',
                    ],
                ], 401);
            }

            $userId = $user->id;
            $userData = [
                'name' => $user->name,
                'email' => $user->email,
                'bio' => $user->bio ?? '',
            ];

            $user->delete();

            // Log CRUD action to crudcrud.com
            $this->logCrudAction('delete', 'User', $userId, $userData);

            return response()->json([
                'success' => true,
                'data' => [],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Failed to delete account. Please try again later.',
                    'details' => $e->getMessage(),
                ],
            ], 500);
        }
    }

    /**
     * Fetch CRUD logs from crudcrud.com.
     */
    public function getCrudLogs(Request $request)
    {
        try {
            $user = $request->user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'error' => [
                        'message' => 'Unauthorized. Please provide a valid token.',
                    ],
                ], 401);
            }

            $response = Http::get('https://crudcrud.com/api/0e45d9ad3e66417b9204cd78189945e1/logs', [
                'model' => 'User',
                'model_id' => $user->id,
            ]);

            if ($response->successful()) {
                return response()->json([
                    'success' => true,
                    'data' => [
                        'logs' => $response->json(),
                    ],
                ], 200);
            }

            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Failed to retrieve CRUD logs.',
                    'details' => $response->body(),
                ],
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'message' => 'Failed to retrieve CRUD logs. Please try again later.',
                    'details' => $e->getMessage(),
                ],
            ], 500);
        }
    }

    /**
     * Log CRUD action to crudcrud.com.
     */
    private function logCrudAction($action, $model, $modelId, $userData = [])
    {
        try {
            $response = Http::post('https://crudcrud.com/api/0e45d9ad3e66417b9204cd78189945e1/logs', [
                'action' => $action,
                'model' => $model,
                'model_id' => $modelId,
                'user_data' => $userData,
                'timestamp' => now()->toIso8601String(),
            ]);

            if ($response->successful()) {
                \Log::info('CRUD action logged: ' . $response->body());
            } else {
                \Log::error('Failed to log CRUD action: ' . $response->body());
            }
        } catch (\Exception $e) {
            \Log::error('Failed to log CRUD action: ' . $e->getMessage());
        }
    }
}