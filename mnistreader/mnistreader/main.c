#include <stdio.h>
int main()
{

	//printf("test");

	FILE *pointToMnist;
	char *buffer;
	size_t result;

	long lSize;
	char buf;

	pointToMnist = fopen("../../MNIST/train-images.idx3-ubyte","r");

	fseek(pointToMnist, 0, SEEK_END);
	lSize = ftell(pointToMnist);
	rewind(pointToMnist);
	buffer = (char*)malloc(sizeof(char)*lSize);
	if (buffer == NULL) { fputs("Memory error", stderr); exit(2); }

	result = fread(buffer, 1, lSize, pointToMnist);
   
	//print the first number - 00000803
	for (int i = 1; i <= 7; i++)
	{
		printf("%02x ", buffer[i]);
	}

	//while(fread(&buf, 1, 1, pointToMnist))
	//{
	//	printf("%02x", buf);
	//	if (feof(pointToMnist))
	//	{
	//		printf("ended");
	//	}

	//};
		getch();
	fclose(pointToMnist);
	return 0;
}