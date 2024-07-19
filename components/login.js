"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
/* import { useEffect } from 'react'; */

export default function login({ users }) {
/*     useEffect(() => {
        console.log(users);
    }, [users]);
 */
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Please enter your username and password to login.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required placeholder="Password" />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full hover:bg-blue-500 transition-colors">Sign in</Button>
            </CardFooter>
        </Card>
    );
}
