/**
 * Fixes and improvements for built in runner functions, plus similar new utilities
 */

 function on_party_invite(name) // called by the inviter's name
{
    if (name.contains("Nyoom")) {
        accept_party_invite(name);
    }
}