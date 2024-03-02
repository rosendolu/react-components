#include <stdio.h>
#include <emscripten/emscripten.h>

// Define the echo function
EMSCRIPTEN_KEEPALIVE
void echo() {
    printf("hello world!\n");
}

int main() {
    // No need to call echo() here as it will be called from JavaScript
    return 0;
}
